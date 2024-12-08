use std::{
    collections::{HashMap, HashSet},
    fmt::Display,
    str::FromStr,
};

use common::{ParsePuzzleErr, PuzzleParts};

#[derive(Clone)]
enum LocationType {
    Empty,
    Obstacle,
    Guard,
}

impl FromStr for LocationType {
    type Err = ParsePuzzleErr;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "." => Ok(LocationType::Empty),
            "#" => Ok(LocationType::Obstacle),
            "^" => Ok(LocationType::Guard),
            _ => Err(ParsePuzzleErr),
        }
    }
}

impl Display for LocationType {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let result = match self {
            LocationType::Empty => ".",
            LocationType::Obstacle => "#",
            LocationType::Guard => "G",
        };
        write!(f, "{}", result)
    }
}

#[derive(Eq, Hash, PartialEq, Clone, Copy)]
struct Position {
    row: isize,
    col: isize,
}

impl Position {
    fn new(row: isize, col: isize) -> Self {
        Self { row, col }
    }
}

#[derive(Eq, Hash, PartialEq, Clone, Debug)]
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

impl Direction {
    fn get_delta(&self) -> (isize, isize) {
        match self {
            Direction::Up => (-1, 0),
            Direction::Down => (1, 0),
            Direction::Left => (0, -1),
            Direction::Right => (0, 1),
        }
    }
}

#[derive(Clone)]
struct Guard {
    position: Position,
    direction: Direction,
    visited: HashSet<(Position, Direction)>,
}

impl Guard {
    fn add_visited(&mut self, row: isize, col: isize, direction: Direction) {
        self.visited.insert((Position::new(row, col), direction));
    }
    fn distinct_score(&self) -> usize {
        let mut distinct: HashSet<Position> = HashSet::new();
        self.visited.iter().for_each(|(pos, _)| {
            distinct.insert(pos.clone());
        });

        distinct.len()
    }

    fn move_to_location(&mut self, row: isize, col: isize) {
        self.position = Position::new(row, col);
        self.add_visited(row, col, self.direction.clone());
    }
    fn turn_right(&mut self) {
        match self.direction {
            Direction::Up => self.direction = Direction::Right,
            Direction::Right => self.direction = Direction::Down,
            Direction::Down => self.direction = Direction::Left,
            Direction::Left => self.direction = Direction::Up,
        }
    }
}

#[derive(Clone)]
pub struct Day06 {
    guard: Guard,
    grid: HashMap<Position, LocationType>,
}

impl Day06 {
    pub fn new(input: &String) -> Self {
        let mut guard = Guard {
            position: Position { row: 0, col: 0 },
            visited: HashSet::new(),
            direction: Direction::Up,
        };
        let mut grid = HashMap::new();

        input
            .trim()
            .lines()
            .enumerate()
            .for_each(|(row_index, row_line)| {
                row_line
                    .trim()
                    .chars()
                    .enumerate()
                    .for_each(|(col_index, char)| {
                        let loc_type = LocationType::from_str(&char.to_string());
                        match loc_type.unwrap() {
                            LocationType::Guard => {
                                guard.position.row = row_index.try_into().unwrap();
                                guard.position.col = col_index.try_into().unwrap();
                                guard.add_visited(
                                    row_index.try_into().unwrap(),
                                    col_index.try_into().unwrap(),
                                    Direction::Up,
                                );
                                grid.insert(
                                    Position::new(
                                        row_index.try_into().unwrap(),
                                        col_index.try_into().unwrap(),
                                    ),
                                    LocationType::Empty,
                                )
                            }
                            LocationType::Empty => grid.insert(
                                Position::new(
                                    row_index.try_into().unwrap(),
                                    col_index.try_into().unwrap(),
                                ),
                                LocationType::Empty,
                            ),
                            LocationType::Obstacle => grid.insert(
                                Position::new(
                                    row_index.try_into().unwrap(),
                                    col_index.try_into().unwrap(),
                                ),
                                LocationType::Obstacle,
                            ),
                        };
                    });
            });

        Self { guard, grid }
    }

    fn patrol(&mut self) {
        loop {
            let delta = self.guard.direction.get_delta();
            let new_position = Position::new(
                self.guard.position.row + delta.0,
                self.guard.position.col + delta.1,
            );

            match self.grid.get(&new_position) {
                Some(loc_type) => {
                    match loc_type {
                        // we turn
                        LocationType::Obstacle => self.guard.turn_right(),
                        // we move
                        LocationType::Empty => {
                            self.guard
                                .move_to_location(new_position.row, new_position.col);
                        }
                        LocationType::Guard => panic!("We moved onto a spot occupied by a guard?"),
                    }
                }
                // we are outside the grid and done
                None => return,
            }
        }
    }

    fn is_loop(&self, grid: HashMap<Position, LocationType>) -> bool {
        let mut temp_guard = self.guard.clone();

        loop {
            let delta = temp_guard.direction.get_delta();
            let new_position = Position::new(
                temp_guard.position.row + delta.0,
                temp_guard.position.col + delta.1,
            );

            // we check to see if we've been here before. If so, we have a loop!
            match temp_guard
                .visited
                .get(&(new_position.clone(), temp_guard.direction.clone()))
            {
                Some(_) => return true,
                None => (),
            };

            match grid.get(&new_position) {
                Some(loc_type) => {
                    match loc_type {
                        // we turn
                        LocationType::Obstacle => temp_guard.turn_right(),
                        // we move
                        LocationType::Empty => {
                            temp_guard.move_to_location(new_position.row, new_position.col);
                        }
                        LocationType::Guard => panic!("We moved onto a spot occupied by a guard?"),
                    };
                }
                // we are outside the grid and not a loop
                None => return false,
            }
        }
    }
}

impl PuzzleParts for Day06 {
    fn part_one(&mut self) -> String {
        self.patrol();
        self.guard.distinct_score().to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        let fresh_guard = self.guard.clone();
        // we only need to place obstacles in visited squares
        self.patrol();

        let mut visited_hash: HashSet<Position> = HashSet::new();

        self.guard.visited.clone().iter().for_each(|(pos, _)| {
            visited_hash.insert(pos.clone());
        });

        // reset the guard
        self.guard = fresh_guard;
        Some(
            visited_hash
                .iter()
                .filter(|pos| {
                    let mut new_grid = self.grid.clone();
                    new_grid.insert(**pos, LocationType::Obstacle);
                    self.is_loop(new_grid)
                })
                .count()
                .to_string(),
        )
    }
}
