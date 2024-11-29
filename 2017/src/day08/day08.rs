use std::{collections::HashMap, str::FromStr};

use colorized::{Color, Colors};
use common::{ParsePuzzleErr, PuzzleParts};

#[derive(Debug)]
pub struct Day08 {
    instructions: Vec<Instruction>,
    registers: HashMap<String, isize>,
    registers_max: HashMap<String, isize>,
}

#[derive(Debug, Clone, Copy)]
enum Actions {
    Increase,
    Decrease,
}

impl Actions {
    fn get_new_value(self, current: isize, operand: isize) -> isize {
        match self {
            Actions::Increase => current + operand,
            Actions::Decrease => current - operand,
        }
    }
}

#[derive(Debug, Copy, Clone)]
enum Conditions {
    LessThan,
    GreaterThan,
    LessThanOrEqual,
    GreaterThanOrEqual,
    Equal,
    NotEqual,
}

impl FromStr for Conditions {
    type Err = ParsePuzzleErr;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            ">" => Ok(Conditions::GreaterThan),
            ">=" => Ok(Conditions::GreaterThanOrEqual),
            "<" => Ok(Conditions::LessThan),
            "<=" => Ok(Conditions::LessThanOrEqual),
            "==" => Ok(Conditions::Equal),
            "!=" => Ok(Conditions::NotEqual),
            v => {
                println!(
                    "\n{}: found unexpected condition {}\n",
                    "error".color(Colors::RedFg),
                    v.color(Colors::YellowFg)
                );
                panic!()
            }
        }
    }
}
impl Conditions {
    fn is_true(self, a: isize, b: isize) -> bool {
        match self {
            Conditions::Equal => a == b,
            Conditions::NotEqual => a != b,
            Conditions::LessThan => a < b,
            Conditions::LessThanOrEqual => a <= b,
            Conditions::GreaterThan => a > b,
            Conditions::GreaterThanOrEqual => a >= b,
        }
    }
}

#[derive(Debug)]
struct Instruction {
    register: String,
    action: Actions,
    action_operand: isize,
    condition_operator: Conditions,
    condition_operand: isize,
    condition_register: String,
}

impl FromStr for Instruction {
    type Err = ParsePuzzleErr;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut i = s.trim().split_whitespace();
        let register = i.next().unwrap().to_string();
        let action = match i.next().unwrap() {
            "inc" => Actions::Increase,
            "dec" => Actions::Decrease,
            v => {
                println!(
                    "\n{}: found unexpected action {}\n",
                    "error".color(Colors::RedFg),
                    v.color(Colors::YellowFg)
                );
                panic!()
            }
        };

        let action_operand = i.next().unwrap().parse::<isize>().unwrap();
        // the 'if'
        i.next();
        let condition_register = i.next().unwrap().to_string();
        let condition_operator = Conditions::from_str(i.next().unwrap()).unwrap();

        let condition_operand = i.next().unwrap().parse::<isize>().unwrap();

        Ok(Self {
            register,
            action,
            action_operand,
            condition_operand,
            condition_operator,
            condition_register,
        })
    }
}

impl Instruction {
    fn should_apply_change(&self, target_register_value: isize) -> bool {
        self.condition_operator
            .is_true(target_register_value, self.condition_operand)
    }

    fn get_new_value(&self, target_register_value: isize) -> isize {
                    self.action.get_new_value(target_register_value, self.action_operand)
    }
}

impl FromStr for Day08 {
    type Err = ParsePuzzleErr;

    fn from_str(input: &str) -> Result<Self, Self::Err> {
        let instructions: Vec<Instruction> = input
            .trim()
            .lines()
            .map(|l| Instruction::from_str(l).unwrap())
            .collect();
        let mut registers = HashMap::new();
        let mut registers_max = HashMap::new();
        instructions.iter().for_each(|i| {
            registers.insert(i.register.clone(), 0);
            registers.insert(i.condition_register.clone(), 0);

            registers_max.insert(i.register.clone(), 0);
            registers_max.insert(i.condition_register.clone(), 0);

        });

        Ok(Self {
            instructions,
            registers,
            registers_max,
        })
    }
}

impl Day08 {
fn process(&mut self) {
        self.instructions.iter().for_each(|i| {
            let cond_target_register = i.condition_register.clone();
            let cond_target_register_value = *self.registers.get(&cond_target_register).unwrap();
            if i.should_apply_change(cond_target_register_value) {
                let action_target_register = i.register.clone();
                let action_target_register_value = *self.registers.get(&action_target_register).unwrap();
                let new_value = i.get_new_value(action_target_register_value);
                self.registers.insert(action_target_register.clone(),new_value);

                let current_max = *self.registers_max.get(&action_target_register).unwrap();
                if new_value > current_max {
                    self.registers_max.insert(action_target_register, new_value);
                }
            }
        });
}
}


impl PuzzleParts for Day08 {
    fn part_one(&mut self) -> String {
        self.process();
        self.registers.values().max().unwrap().to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        self.process();
        Some(self.registers_max.values().max().unwrap().to_string())
    }

    fn new(input: &String) -> Self {
        Day08::from_str(input).unwrap()
    }
}
