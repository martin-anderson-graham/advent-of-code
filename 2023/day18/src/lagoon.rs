pub mod lagoon {
    use std::{
        collections::{HashMap, HashSet, VecDeque},
        fmt::Display,
        str::FromStr,
    };

    #[derive(Debug)]
    pub struct ParseLagoonError;

    #[derive(Debug)]
    pub struct ParseDirectionError;

    #[derive(Debug)]
    pub struct ParseInstructionError;

    #[derive(Debug, Clone, Copy)]
    enum Direction {
        Up,
        Down,
        Left,
        Right,
    }

    impl FromStr for Direction {
        type Err = ParseDirectionError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            match s {
                "R" => Ok(Direction::Right),
                "D" => Ok(Direction::Down),
                "L" => Ok(Direction::Left),
                "U" => Ok(Direction::Up),
                _ => panic!("Invalid direction"),
            }
        }
    }

    #[derive(Debug, Clone, Copy)]
    struct Instruction {
        direction: Direction,
        amount: usize,
    }

    impl FromStr for Instruction {
        type Err = ParseInstructionError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let mut chars = s.split(" ").take(2);
            Ok(Self {
                direction: Direction::from_str(chars.next().unwrap()).unwrap(),
                amount: chars.next().unwrap().parse::<usize>().unwrap(),
            })
        }
    }
    impl Instruction {
        fn new(raw: &str) -> Self {
            let hex = raw
                .split(" ")
                .skip(2)
                .next()
                .unwrap()
                .chars()
                .filter(|c| !c.is_ascii_punctuation())
                .map(|c| c.to_string())
                .collect::<Vec<_>>()
                .join("");

            Self {
                amount: usize::from_str_radix(&hex[0..5], 16).unwrap(),
                direction: match &hex[5..] {
                    "3" => Direction::Up,
                    "2" => Direction::Left,
                    "1" => Direction::Down,
                    "0" => Direction::Right,
                    _ => panic!("Invalid direction part two"),
                },
            }
        }
    }

    #[derive(Debug)]
    pub struct Lagoon {
        instructions: Vec<Instruction>,
        floor: HashMap<(isize, isize), bool>,
        digger_location: (isize, isize),
    }

    impl FromStr for Lagoon {
        type Err = ParseLagoonError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let instructions = s
                .lines()
                .map(|l| Instruction::from_str(l).unwrap())
                .collect::<Vec<_>>();
            Ok(Self {
                instructions,
                floor: HashMap::from([((0, 0), true)]),
                digger_location: (0, 0),
            })
        }
    }

    impl Display for Lagoon {
        fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
            let mut result = "".to_string();
            let ((min_x, max_x), (min_y, max_y)) = self.get_min_max_x_y();
            for y in min_y..=max_y {
                for x in min_x..=max_x {
                    if self.floor.get(&(x, y)).is_some() {
                        result += "#";
                    } else {
                        result += ".";
                    }
                }
                result += "\n";
            }

            write!(f, "{}", result)
        }
    }

    impl Lagoon {
        fn get_min_max_x_y(&self) -> ((isize, isize), (isize, isize)) {
            let mut min_x = isize::MAX;
            let mut min_y = isize::MAX;
            let mut max_y = isize::MIN;
            let mut max_x = isize::MIN;

            self.floor.keys().for_each(|k| {
                let x = k.0;
                let y = k.1;
                if x < min_x {
                    min_x = x;
                };
                if x > max_x {
                    max_x = x;
                };
                if y < min_y {
                    min_y = y;
                }
                if y > max_y {
                    max_y = y;
                };
            });
            ((min_x, max_x), (min_y, max_y))
        }

        fn dig_one_instruction(&mut self, instruction: &Instruction) {
            let delta: (isize, isize) = match instruction.direction {
                Direction::Up => (0, -1),
                Direction::Down => (0, 1),
                Direction::Left => (-1, 0),
                Direction::Right => (1, 0),
            };

            for _ in 0..instruction.amount {
                self.digger_location = (
                    self.digger_location.0 + delta.0,
                    self.digger_location.1 + delta.1,
                );
                self.floor.insert(self.digger_location.clone(), true);
            }
        }
        pub fn dig(&mut self) {
            for instruction in self.instructions.clone() {
                self.dig_one_instruction(&instruction);
            }
        }

        pub fn fill_in(&mut self) {
            let ((min_x, max_x), (min_y, max_y)) = self.get_min_max_x_y();
            let mut invalid_points: HashSet<(isize, isize)> = HashSet::new();
            let mut valid_points: HashSet<(isize, isize)> = HashSet::new();
            for y in min_y..=max_y {
                for x in min_x..=max_x {
                    // already dug hole we move on
                    if self.floor.get(&(x, y)).is_some() {
                        continue;
                    }

                    // start building a list of queue of neighbors
                    let mut all_nodes_under_test: HashSet<(isize, isize)> = HashSet::from([(x, y)]);
                    let mut q: VecDeque<(isize, isize)> = VecDeque::new();
                    q.push_back((x, y));
                    // if the queue empties we must be inside
                    let mut neighbors_are_valid = true;
                    while !q.is_empty() {
                        let current_node = q.pop_front().unwrap();
                        // if current_node is valid or invalid we are done
                        if invalid_points.get(&current_node.clone()).is_some() {
                            neighbors_are_valid = false;
                            break;
                        }
                        if valid_points.get(&current_node.clone()).is_some() {
                            neighbors_are_valid = true;
                            break;
                        }
                        let neighbors = vec![
                            (current_node.0 + 1, current_node.1),
                            (current_node.0 - 1, current_node.1),
                            (current_node.0, current_node.1 + 1),
                            (current_node.0, current_node.1 - 1),
                        ];
                        for neighbor in neighbors {
                            // ignore wall neighbors
                            if self.floor.get(&neighbor).is_some() {
                                continue;
                            }
                            // we hit an edge
                            if neighbor.0 < min_x
                                || neighbor.0 > max_x
                                || neighbor.1 < min_y
                                || neighbor.1 > max_y
                            {
                                all_nodes_under_test.insert(neighbor);
                                neighbors_are_valid = false;
                                break;
                            }
                            if all_nodes_under_test.get(&neighbor).is_none() {
                                q.push_back(neighbor);
                                all_nodes_under_test.insert(neighbor);
                            }
                        }
                    }
                    all_nodes_under_test.drain().for_each(|k| {
                        if neighbors_are_valid {
                            valid_points.insert(k);
                        } else {
                            invalid_points.insert(k);
                        };
                    });
                }
            }
            valid_points.drain().for_each(|k| {
                self.floor.insert(k, true);
            });
        }

        pub fn score(&self) -> usize {
            self.floor.len()
        }

        pub fn new(raw: &str) -> Self {
            let instructions = raw.lines().map(|l| Instruction::new(l)).collect::<Vec<_>>();
            Self {
                instructions,
                floor: HashMap::from([((0, 0), true)]),
                digger_location: (0, 0),
            }
        }
    }
}
