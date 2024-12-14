use std::{collections::HashSet, fmt::Display, str::FromStr};

use common::{ParsePuzzleErr, Part, PuzzleParts};

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
struct Point {
    x: isize,
    y: isize,
}

impl FromStr for Point {
    type Err = ParsePuzzleErr;

    // form x,y
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut parts = s.split(',');
        Ok(Self {
            x: parts.next().unwrap().parse().unwrap(),
            y: parts.next().unwrap().parse().unwrap(),
        })
    }
}

#[derive(Debug)]
struct Robot {
    position: Point,
    velocity: Point,
}

impl Robot {
    fn move_self(&mut self, grid: &Grid) {
        let new_x = self.position.x + self.velocity.x;
        let new_y = self.position.y + self.velocity.y;

        self.position = grid.get_new_position(new_x, new_y);
    }
}

impl FromStr for Robot {
    type Err = ParsePuzzleErr;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut parts = s.trim().split(" ");
        let position_part = parts.next().unwrap().replace("p=", "");
        let velocity_part = parts.next().unwrap().replace("v=", "");
        Ok(Self {
            position: Point::from_str(&position_part).unwrap(),
            velocity: Point::from_str(&velocity_part).unwrap(),
        })
    }
}

struct Grid {
    width: isize,
    height: isize,
}

impl Grid {
    fn get_new_position(&self, new_x: isize, new_y: isize) -> Point {
        let mut x = new_x;
        if new_x >= self.width {
            x -= self.width;
        } else if new_x < 0 {
            x += self.width;
        }

        let mut y = new_y;
        if new_y >= self.height {
            y -= self.height;
        } else if new_y < 0 {
            y += self.height;
        }
        Point { x, y }
    }
}

pub struct Day14 {
    grid: Grid,
    robots: Vec<Robot>,
}

impl Display for Day14 {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let mut result = String::new();
        (0..self.grid.height).for_each(|row_index| {
            (0..self.grid.width).for_each(|col_index| {
                match self
                    .robots
                    .iter()
                    .filter(|r| r.position.x == row_index && r.position.y == col_index)
                    .next()
                {
                    Some(_) => result.push_str("r"),
                    None => result.push_str("."),
                }
            });
            result.push_str("\n");
        });
        write!(f, "{}", result)
    }
}

impl Day14 {
    pub fn new(input: &String) -> Self {
        Self {
            grid: Grid {
                width: 0,
                height: 0,
            },
            robots: input
                .trim()
                .lines()
                .map(|l| Robot::from_str(l).unwrap())
                .collect(),
        }
    }

    pub fn update_grid(&mut self, width: isize, height: isize) {
        self.grid = Grid { width, height }
    }

    fn process(&mut self, seconds: usize, part: Part) {
        match part {
            Part::One => (0..seconds)
                .for_each(|_| self.robots.iter_mut().for_each(|r| r.move_self(&self.grid))),
            Part::Two => {
                let mut seen_seconds: HashSet<usize> = HashSet::new();

                (0..seconds).for_each(|s| {
                    let mut positions: HashSet<Point> = HashSet::new();

                    self.robots.iter_mut().for_each(|r| {
                        r.move_self(&self.grid);
                        positions.insert(r.position.clone());
                    });

                    positions.iter().for_each(|p| {
                        if positions.get(&Point { x: p.x + 1, y: p.y }).is_some()
                            && positions.get(&Point { x: p.x + 2, y: p.y }).is_some()
                            && positions.get(&Point { x: p.x + 3, y: p.y }).is_some()
                            && positions.get(&Point { x: p.x + 4, y: p.y }).is_some()
                            && positions.get(&Point { x: p.x + 5, y: p.y }).is_some()
                            && positions.get(&Point { x: p.x + 6, y: p.y }).is_some()
                            && positions.get(&Point { x: p.x + 7, y: p.y }).is_some()
                            && seen_seconds.get(&s).is_none()
                        {
                            seen_seconds.insert(s);
                            println!("\n\n------ Second {} ----- \n", s);
                            println!("{}", self);
                        }
                    });
                });
                println!("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
            }
        }
    }

    fn score(&self) -> usize {
        let q1 = self
            .robots
            .iter()
            .filter(|r| r.position.x > self.grid.width / 2 && r.position.y < self.grid.height / 2)
            .count();

        let q2 = self
            .robots
            .iter()
            .filter(|r| r.position.x < self.grid.width / 2 && r.position.y < self.grid.height / 2)
            .count();

        let q3 = self
            .robots
            .iter()
            .filter(|r| r.position.x < self.grid.width / 2 && r.position.y > self.grid.height / 2)
            .count();

        let q4 = self
            .robots
            .iter()
            .filter(|r| r.position.x > self.grid.width / 2 && r.position.y > self.grid.height / 2)
            .count();

        q1 * q2 * q3 * q4
    }
}

impl PuzzleParts for Day14 {
    fn part_one(&mut self) -> String {
        if self.grid.width == 0 && self.grid.height == 0 {
            // use the input values if not in a test
            self.update_grid(101, 103);
        }
        self.process(100, Part::One);
        self.score().to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        if self.grid.width == 0 && self.grid.height == 0 {
            // use the input values if not in a test
            self.update_grid(101, 103);
        }
        self.process(100000, Part::Two);
        None
    }
}
