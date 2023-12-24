pub mod hall {
    use std::{collections::HashSet, str::FromStr};

    #[derive(Debug)]
    struct ParsePointError;

    #[derive(Debug)]
    pub struct ParseHallError;

    #[derive(Debug, Hash, PartialEq, Eq, Clone, Copy)]
    enum Direction {
        Up,
        Down,
        Left,
        Right,
    }

    #[derive(Debug, Clone, Copy)]
    struct Beam {
        direction: Direction,
        x: usize,
        y: usize,
        invalid: bool,
    }

    impl Beam {
        fn spawn(&self, current_point: &Point) -> Option<Beam> {
            match current_point {
                Point::HoriztonalSplitter => match self.direction {
                    Direction::Up => Some(Beam {
                        direction: Direction::Right,
                        x: self.x,
                        y: self.y,
                        invalid: false,
                    }),
                    Direction::Down => Some(Beam {
                        direction: Direction::Right,
                        x: self.x,
                        y: self.y,
                        invalid: false,
                    }),
                    _ => None,
                },
                Point::VerticalSplitter => match self.direction {
                    Direction::Left => Some(Beam {
                        direction: Direction::Down,
                        x: self.x,
                        y: self.y,
                        invalid: false,
                    }),
                    Direction::Right => Some(Beam {
                        direction: Direction::Down,
                        x: self.x,
                        y: self.y,
                        invalid: false,
                    }),
                    _ => None,
                },
                _ => None,
            }
        }
        fn turn(&mut self, current_point: &Point) {
            match current_point {
                Point::ForwardMirror => {
                    match self.direction {
                        Direction::Right => self.direction = Direction::Up,
                        Direction::Down => self.direction = Direction::Left,
                        Direction::Up => self.direction = Direction::Right,
                        Direction::Left => self.direction = Direction::Down,
                    };
                }
                Point::BackwardMirror => {
                    match self.direction {
                        Direction::Right => self.direction = Direction::Down,
                        Direction::Down => self.direction = Direction::Right,
                        Direction::Up => self.direction = Direction::Left,
                        Direction::Left => self.direction = Direction::Up,
                    };
                }
                Point::VerticalSplitter => {
                    match self.direction {
                        Direction::Right => self.direction = Direction::Up,
                        Direction::Left => self.direction = Direction::Up,
                        // others don't turn
                        _ => (),
                    }
                }
                Point::HoriztonalSplitter => {
                    match self.direction {
                        Direction::Down => self.direction = Direction::Left,
                        Direction::Up => self.direction = Direction::Left,
                        // others don't turn
                        _ => (),
                    }
                }
                Point::Empty => (),
            };
        }
        fn update_position(&mut self, num_cols: usize, num_rows: usize) {
            match self.direction {
                Direction::Right => {
                    if self.x == num_cols - 1 {
                        self.invalid = true;
                    } else {
                        self.x += 1;
                    };
                }
                Direction::Left => {
                    if self.x == 0 {
                        self.invalid = true;
                    } else {
                        self.x -= 1;
                    }
                }
                Direction::Up => {
                    if self.y == 0 {
                        self.invalid = true;
                    } else {
                        self.y -= 1;
                    }
                }
                Direction::Down => {
                    if self.y == num_rows - 1 {
                        self.invalid = true;
                    } else {
                        self.y += 1;
                    }
                }
            };
        }
    }

    #[derive(Debug, Copy, Clone)]
    enum Point {
        Empty,
        ForwardMirror,
        BackwardMirror,
        HoriztonalSplitter,
        VerticalSplitter,
    }

    impl FromStr for Point {
        type Err = ParsePointError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            match s {
                "." => Ok(Point::Empty),
                "/" => Ok(Point::ForwardMirror),
                "\\" => Ok(Point::BackwardMirror),
                "|" => Ok(Point::VerticalSplitter),
                "-" => Ok(Point::HoriztonalSplitter),
                _ => panic!("Invalid point character - {}", s),
            }
        }
    }

    #[derive(Debug, Clone)]
    pub struct Hall {
        mirrors: Vec<Vec<Point>>,
        energized: HashSet<(usize, usize)>,
        max_energized: usize,
        beams: Vec<Beam>,
        beam_cache: HashSet<(usize, usize, Direction)>,
        num_rows: usize,
        num_cols: usize,
    }

    impl FromStr for Hall {
        type Err = ParseHallError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let mirrors = s
                .lines()
                .map(|l| {
                    l.chars()
                        .map(|c| Point::from_str(&c.to_string()).unwrap())
                        .collect::<Vec<_>>()
                })
                .collect::<Vec<_>>();
            let mut beam_cache = HashSet::new();
            beam_cache.insert((0, 0, Direction::Right));

            let mut energized = HashSet::new();
            energized.insert((0, 0));
            Ok(Self {
                mirrors: mirrors.clone(),
                energized,
                max_energized: 0,
                beams: vec![Beam {
                    direction: Direction::Right,
                    x: 0,
                    y: 0,
                    invalid: false,
                }],
                beam_cache,
                num_cols: mirrors.get(0).unwrap().len(),
                num_rows: mirrors.len(),
            })
        }
    }

    impl Hall {
        pub fn search_all(&mut self) -> usize {
            // left edge
            for start_y in 0..self.mirrors.len() {
                self.reset(0, start_y, Direction::Right);
                self.process();
                if self.energized.len() > self.max_energized {
                    self.max_energized = self.energized.len();
                }
            }
            // right edge
            for start_y in 0..self.mirrors.len() {
                self.reset(self.num_cols - 1, start_y, Direction::Left);
                self.process();
                if self.energized.len() > self.max_energized {
                    self.max_energized = self.energized.len();
                }
            }
            // top edge
            for start_x in 0..self.num_cols {
                self.reset(start_x, 0, Direction::Down);
                self.process();
                if self.energized.len() > self.max_energized {
                    self.max_energized = self.energized.len();
                }
            }
            // top edge
            for start_x in 0..self.num_cols {
                self.reset(start_x, self.num_rows - 1, Direction::Up);
                self.process();
                if self.energized.len() > self.max_energized {
                    self.max_energized = self.energized.len();
                }
            }

            self.max_energized
        }
        fn reset(&mut self, x: usize, y: usize, direction: Direction) {
            self.energized = HashSet::new();
            self.energized.insert((x, y));
            self.beams = vec![Beam {
                direction,
                x,
                y,
                invalid: false,
            }];
            self.beam_cache = HashSet::new();
            self.beam_cache.insert((x, y, direction));
        }
        fn step(&mut self) {
            let mut new_beams: Vec<Beam> = Vec::new();
            // turn beams and spawn new beams
            for beam in &mut self.beams {
                let current_point = self.mirrors.get(beam.y).unwrap().get(beam.x).unwrap();
                // push a new beam if it's stat's haven't been seen
                if let Some(new_beam) = beam.spawn(&current_point) {
                    // if self
                    //     .beam_cache
                    //     .get(&(new_beam.x, new_beam.y, new_beam.direction))
                    //     .is_none()
                    // {
                    new_beams.push(new_beam);
                    // }
                }
                beam.turn(&current_point);
            }
            // add new beams to Hall
            for new_beam in new_beams {
                self.beams.push(new_beam);
            }
            // move all beams
            for beam in &mut self.beams {
                beam.update_position(self.num_cols, self.num_rows);
                if !beam.invalid {
                    self.energized.insert((beam.x, beam.y));
                }
            }
            // discard any beams that enter a loop
            self.beams
                .retain(|b| self.beam_cache.get(&(b.x, b.y, b.direction)).is_none() && !b.invalid);
            for beam in &self.beams {
                self.beam_cache.insert((beam.x, beam.y, beam.direction));
            }
        }
        pub fn process(&mut self) -> usize {
            while !self.beams.is_empty() {
                self.step();
            }
            self.energized.len()
        }
        pub fn print_grid(&self) {
            let mut result = String::new();
            for y in 0..self.mirrors.len() {
                for x in 0..self.mirrors.get(y).unwrap().len() {
                    result += match self.mirrors.get(y).unwrap().get(x).unwrap() {
                        Point::Empty => ".",
                        Point::HoriztonalSplitter => "-",
                        Point::VerticalSplitter => "|",
                        Point::BackwardMirror => "\\",
                        Point::ForwardMirror => "/",
                    }
                }
                result += "\n";
            }
            println!("{result}");
        }
    }
}
