pub mod hill {
    use core::fmt;
    use std::{collections::HashMap, io::Write, str::FromStr};

    #[derive(Debug)]
    struct ParsePointError;

    #[derive(Debug)]
    pub struct ParseHillError;

    #[derive(Copy, Clone, PartialEq, Eq, Hash, Debug)]
    enum Point {
        RoundRock,
        SquareRock,
        Empty,
    }

    impl FromStr for Point {
        type Err = ParsePointError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            match s {
                "." => Ok(Point::Empty),
                "#" => Ok(Point::SquareRock),
                "O" => Ok(Point::RoundRock),
                _ => panic!("got an invalid point"),
            }
        }
    }

    pub struct Hill {
        points: Vec<Vec<Point>>,
        rows: usize,
        // points and current counter / score
        cache: HashMap<Vec<Vec<Point>>, (usize, usize, Vec<Vec<Point>>)>,
        pub score: usize,
        // hash of seen counters and their next counter and their score?
        pub seen_counters: HashMap<usize, (usize, usize)>,
        pub counter: usize,
    }

    impl Hill {
        fn can_roll_left(&self, x: usize, y: usize) -> bool {
            if x == 0 {
                return false;
            }
            match self.points.get(y) {
                None => return false,
                Some(row) => match row.get(x - 1) {
                    None => return false,
                    Some(p) => match p {
                        Point::Empty => return true,
                        Point::RoundRock => return false,
                        Point::SquareRock => return false,
                    },
                },
            }
        }

        fn can_roll_right(&self, x: usize, y: usize) -> bool {
            match self.points.get(y) {
                None => return false,
                Some(row) => match row.get(x + 1) {
                    None => return false,
                    Some(p) => match p {
                        Point::Empty => return true,
                        Point::RoundRock => return false,
                        Point::SquareRock => return false,
                    },
                },
            }
        }

        fn can_roll_up(&mut self, x: usize, y: usize) -> bool {
            if y == 0 {
                return false;
            }
            match self.points.get(y - 1) {
                None => return false,
                Some(row) => match row.get(x) {
                    None => return false,
                    Some(p) => match p {
                        Point::Empty => return true,
                        Point::RoundRock => return false,
                        Point::SquareRock => return false,
                    },
                },
            }
        }

        fn can_roll_down(&self, x: usize, y: usize) -> bool {
            if y >= self.points.len() {
                return true;
            }
            match self.points.get(y + 1) {
                None => return false,
                Some(row) => match row.get(x) {
                    None => return false,
                    Some(p) => match p {
                        Point::Empty => return true,
                        Point::RoundRock => return false,
                        Point::SquareRock => return false,
                    },
                },
            }
        }

        pub fn roll_north(&mut self) {
            for y in 0..self.points.len() {
                for x in 0..self.points.get(y).unwrap().len() {
                    match self.points.get(y).unwrap().get(x).unwrap() {
                        Point::SquareRock => continue,
                        Point::Empty => continue,
                        Point::RoundRock => (),
                    };
                    let mut current_y = y;
                    while self.can_roll_up(x, current_y) {
                        self.points[current_y - 1][x] = Point::RoundRock;
                        self.points[current_y][x] = Point::Empty;
                        current_y -= 1;
                    }
                }
            }
        }

        fn roll_south(&mut self) {
            let mut y = self.points.len() - 1;
            loop {
                for x in 0..self.points.get(y).unwrap().len() {
                    match self.points.get(y).unwrap().get(x).unwrap() {
                        Point::RoundRock => (),
                        _ => continue,
                    };
                    let mut current_y = y;

                    while self.can_roll_down(x, current_y) {
                        self.points[current_y + 1][x] = Point::RoundRock;
                        self.points[current_y][x] = Point::Empty;
                        current_y += 1;
                    }
                }
                if y == 0 {
                    break;
                } else {
                    y -= 1;
                }
            }
        }

        pub fn roll_west(&mut self) {
            for y in 0..self.points.len() {
                for x in 0..self.points.get(y).unwrap().len() {
                    match self.points.get(y).unwrap().get(x).unwrap() {
                        Point::SquareRock => continue,
                        Point::Empty => continue,
                        Point::RoundRock => (),
                    };
                    let mut current_x = x;

                    while self.can_roll_left(current_x, y) {
                        self.points[y][current_x - 1] = Point::RoundRock;
                        self.points[y][current_x] = Point::Empty;
                        current_x -= 1;
                    }
                }
            }
        }

        pub fn roll_east(&mut self) {
            for y in 0..self.points.len() {
                let mut x = self.points.get(y).unwrap().len() - 1;
                loop {
                    match self.points.get(y).unwrap().get(x).unwrap() {
                        Point::RoundRock => (),
                        _ => {
                            if x == 0 {
                                break;
                            } else {
                                x -= 1;
                                continue;
                            }
                        }
                    };
                    let mut current_x = x;

                    while self.can_roll_right(current_x, y) {
                        self.points[y][current_x + 1] = Point::RoundRock;
                        self.points[y][current_x] = Point::Empty;
                        current_x += 1;
                    }
                    if x == 0 {
                        break;
                    } else {
                        x -= 1;
                    }
                }
            }
        }

        pub fn cycle(&mut self) -> Option<bool> {
            // assumption once I hit this cache entry I am in a loop
            if let Some(hit) = self.seen_counters.get(&self.counter) {
                self.score = hit.1;
                return Some(true);
            }
            if let Some(hit) = self.cache.get(&self.points) {
                self.score = hit.1;
                let prev_counter = self.counter;
                self.counter = hit.0;
                self.points = hit.2.clone();
                self.seen_counters
                    .insert(prev_counter, (self.counter, self.score));
                return None;
            }
            let pre_roll = self.points.clone();
            self.roll_north();
            self.roll_west();
            self.roll_south();
            self.roll_east();
            self.score = self.get_score();
            self.counter += 1;
            self.cache
                .insert(pre_roll, (self.counter, self.score, self.points.clone()));
            None
        }

        pub fn get_score(&self) -> usize {
            let mut result = 0;
            for (y, row) in self.points.iter().enumerate() {
                for (_, p) in row.iter().enumerate() {
                    match p {
                        Point::RoundRock => result += self.rows - y,
                        _ => (),
                    }
                }
            }
            result
        }
        pub fn get_cycle_length(&self) -> usize {
            let mut result = 0;
            let target_counter = self.counter;
            let mut current_counter = self.counter;
            loop {
                let hit = self.seen_counters.get(&current_counter).unwrap();
                current_counter = hit.0;
                result += 1;
                if current_counter == target_counter {
                    break;
                }
            }
            result
        }
    }

    impl fmt::Display for Hill {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            let result = self
                .points
                .iter()
                .map(|l| {
                    l.iter()
                        .map(|c| match c {
                            Point::RoundRock => "O",
                            Point::SquareRock => "#",
                            Point::Empty => ".",
                        })
                        .collect::<Vec<_>>()
                        .join("")
                })
                .collect::<Vec<_>>()
                .join("\n");
            write!(f, "{}", result)
        }
    }

    impl FromStr for Hill {
        type Err = ParseHillError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let points = s
                .lines()
                .map(|l| {
                    l.chars()
                        .map(|c| Point::from_str(&c.to_string()).unwrap())
                        .collect::<Vec<_>>()
                })
                .collect::<Vec<_>>();
            Ok(Self {
                points,
                rows: s.lines().count(),
                cache: HashMap::new(),
                score: 0,
                seen_counters: HashMap::new(),
                counter: 0,
            })
        }
    }
}
