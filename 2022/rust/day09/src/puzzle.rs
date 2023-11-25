pub mod puzzle {
    use std::str::FromStr;

    use crate::rope::rope::Rope;

    #[derive(Debug, PartialEq, Eq)]
    struct ParseInstructionError;

    #[derive (Debug)]
    enum Instruction {
        Up(usize),
        Down(usize),
        Left(usize),
        Right(usize),
    }
    impl FromStr for Instruction {
        type Err = ParseInstructionError;
        fn from_str(raw: &str) -> Result<Instruction, Self::Err> {
            let mut split = raw.split(" ");
            if let (Some(direction), Some(value_str)) = (split.next(), split.next()) {
                let value = value_str.parse::<usize>().unwrap();
                match direction {
                    "L" => Ok(Instruction::Left(value)),
                    "R" => Ok(Instruction::Right(value)),
                    "U" => Ok(Instruction::Up(value)),
                    "D" => Ok(Instruction::Down(value)),
                    _ => panic!("Hit a direction we don't understand"),
                }
            } else {
                panic!("Failed to split the line")
            }
        }
    }

    #[derive (Debug)]
    pub struct Puzzle {
        instructions: Vec<Instruction>,
        rope: Rope,
    }

    impl Puzzle {
        pub fn new(raw_instruction: &str, rope_length: usize) -> Puzzle {
            let instructions = raw_instruction
                .lines()
                .map(|line| Instruction::from_str(line).unwrap())
                .collect();
            Puzzle {
                instructions,
                rope: Rope::new(rope_length),
            }
        }

        pub fn run_simulation(&mut self) {
            for instruction in self.instructions.iter() {
                match instruction {
                    Instruction::Up(val) => self.rope.move_head((0, 1), *val),
                    Instruction::Down(val) => self.rope.move_head((0, -1), *val),
                    Instruction::Left(val) => self.rope.move_head((-1, 0), *val),
                    Instruction::Right(val) => self.rope.move_head((1, 0), *val),
                };
            }
        }

        pub fn get_score(&self)->usize {
            return self.rope.get_visited_count()
        }
    }
}
