pub mod board {
    use std::{collections::HashMap, str::FromStr};

    #[derive(Debug)]
    pub struct ParseBoardError;

    #[derive(Debug)]
    pub struct ParseTurnError(String);

    #[derive(Debug)]
    pub struct ParsePipeError;

    #[derive(Clone, Copy, Debug)]
    enum Move {
        Up,
        Down,
        Left,
        Right,
    }

    #[derive(Debug)]
    enum Turn {
        UpDown,
        LeftRight,
        UpRight,
        UpLeft,
        DownLeft,
        DownRight,
        Empty,
        Start,
    }

    impl Turn {
        fn get_output_move(&self, input_direction: Move) -> Option<Move> {
            match self {
                Turn::Empty => None,
                Turn::Start => None,
                Turn::UpDown => match input_direction {
                    Move::Up => Some(Move::Up),
                    Move::Down => Some(Move::Down),
                    _ => None,
                },
                Turn::LeftRight => match input_direction {
                    Move::Left => Some(Move::Left),
                    Move::Right => Some(Move::Right),
                    _ => None,
                },
                Turn::UpRight => match input_direction {
                    Move::Down => Some(Move::Right),
                    Move::Left => Some(Move::Up),
                    _ => None,
                },
                Turn::UpLeft => match input_direction {
                    Move::Down => Some(Move::Left),
                    Move::Right => Some(Move::Up),
                    _ => None,
                },
                Turn::DownLeft => match input_direction {
                    Move::Up => Some(Move::Left),
                    Move::Right => Some(Move::Down),
                    _ => None,
                },
                Turn::DownRight => match input_direction {
                    Move::Up => Some(Move::Right),
                    Move::Left => Some(Move::Down),
                    _ => None,
                },
            }
        }
    }

    impl FromStr for Turn {
        type Err = ParseTurnError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            match s {
                "|" => Ok(Turn::UpDown),
                "-" => Ok(Turn::LeftRight),
                "L" => Ok(Turn::UpRight),
                "J" => Ok(Turn::UpLeft),
                "7" => Ok(Turn::DownLeft),
                "F" => Ok(Turn::DownRight),
                "." => Ok(Turn::Empty),
                "S" => Ok(Turn::Start),
                _ => Err(ParseTurnError(s.to_string())),
            }
        }
    }

    #[derive(Debug)]
    struct Pipe {
        x: usize,
        y: usize,
        turn: Turn,
    }

    impl Pipe {
        fn new(pipe_val: &char, x: usize, y: usize) -> Self {
            Self {
                x,
                y,
                turn: Turn::from_str(&pipe_val.to_string()).unwrap(),
            }
        }

        fn get_hash_key(x: usize, y: usize) -> String {
            String::from(format!("({x},{y})"))
        }

        fn get_next_pipe_coordinates(&self, next_move: Move) -> Option<(usize, usize)> {
            match next_move {
                Move::Up => {
                    match self.y > 0 {
                        true => Some((self.x, self.y - 1)),
                        false => None
                    }
                }
                Move::Down => Some((self.x, self.y + 1)),
                Move::Left => match self.x > 0 {
                    true => Some((self.x - 1, self.y)),
                    false => None
                }
                Move::Right => Some((self.x + 1, self.y)),
            }
        }
    }

    pub struct Board {
        pipes: HashMap<String, Pipe>,
        num_rows: usize,
        num_cols: usize,
    }

    impl FromStr for Board {
        type Err = ParseBoardError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let mut pipes: HashMap<_, _> = HashMap::new();
            s.lines().enumerate().for_each(|(y, row)| {
                row.chars().enumerate().for_each(|(x, val)| {
                    pipes.insert(Pipe::get_hash_key(x, y), Pipe::new(&val, x, y));
                });
            });

            let num_rows = s.lines().count();
            let num_cols = s.lines().next().unwrap().chars().count();

            Ok(Self {
                pipes,
                num_rows,
                num_cols,
            })
        }
    }

    impl Board {
        fn find_start(&self) -> &Pipe {
            for x in 0..=self.num_cols {
                for y in 0..=self.num_rows {
                    match self.pipes.get(&Pipe::get_hash_key(x, y)) {
                        Some(pipe) => match pipe.turn {
                            Turn::Start => return pipe,
                            _ => continue,
                        },
                        None => continue,
                    }
                }
            }
            panic!("Didn't find a start point");
        }

        pub fn score(&self, is_part_one: bool) -> usize {
            if !is_part_one {
                return 4;
            }

            let moves_from_start: Vec<Move> = vec![Move::Up, Move::Down, Move::Left, Move::Right];
            for initial_move in moves_from_start {
                let start: &Pipe = self.find_start();
                let mut total_distance = 0;
                let Some((first_x, first_y)) = start.get_next_pipe_coordinates(initial_move) else {continue};
                let mut current_pipe = match self.pipes.get(&Pipe::get_hash_key(first_x, first_y)){
                    Some(pipe) => pipe,
                    None => continue,
                };

                println!("Initial move - {:?}", initial_move);

                println!("{:?} - ", current_pipe.turn.get_output_move(initial_move));
                let mut current_move = initial_move;
                while let Some(next_turn) = current_pipe.turn.get_output_move(current_move) {
                    println!("current-pipe: {:?}", current_pipe);
                    println!("next_turn: {:?}", next_turn);
                    let Some((next_x, next_y)) = current_pipe.get_next_pipe_coordinates(next_turn) else {break};
                    println!("next coord - {},{}", next_x, next_y);
                    current_move = next_turn;
                    match self.pipes.get(&Pipe::get_hash_key(next_x, next_y)) {
                        Some(pipe) => {
                            current_pipe = pipe;
                            match current_pipe.turn {
                                Turn::Start => break,
                                _ => (),
                            };
                        }
                        None => break,
                    }
                    total_distance += 1;
                }
                if total_distance > 0 {
                    match current_pipe.turn {
                        Turn::Start => return total_distance/2 +1,
                        _ => continue,
                    };
                }
                println!("");
            }
            panic!("Didn't find a loop")
        }
    }
}
