use std::str::FromStr;

use common::{ParsePuzzleErr, PuzzleParts};

#[derive(Debug)]
enum Operator {
    Add,
    Multiply,
    Concat,
}

impl Operator {
    fn evaluate(&self, a: isize, b: isize) -> isize {
        match self {
            Operator::Add => a + b,
            Operator::Multiply => a * b,
            Operator::Concat => {
                let strd = format!("{}{}", a, b);
                strd.parse().unwrap()
            }
        }
    }
}

enum Part {
    One,
    Two,
}

#[derive(Debug)]
struct Equation {
    result: isize,
    values: Vec<isize>,
}

impl FromStr for Equation {
    type Err = ParsePuzzleErr;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let (result_string, values_string) = s.trim().split_once(":").unwrap();

        Ok(Self {
            result: result_string.parse().unwrap(),
            values: values_string
                .trim()
                .split(" ")
                .map(|v| v.parse().unwrap())
                .collect(),
        })
    }
}

impl Equation {
    // recursively try every operator
    fn walk(
        &self,
        current_result: isize,
        current_index: usize,
        current_operator: Operator,
        part: &Part,
    ) -> Option<()> {
        // base case we are done
        if current_index == self.values.len() {
            return match current_result == self.result {
                true => Some(()),
                false => None,
            };
        }

        // get the new result given the operator and the current value
        let new_val = self.values.get(current_index).unwrap();
        let new_result = current_operator.evaluate(current_result, *new_val);

        // sanity check - we can't ever decrease, so we can short-circuit
        if new_result > self.result {
            return None;
        }

        if self
            .walk(new_result, current_index + 1, Operator::Add, part)
            .is_some()
        {
            return Some(());
        } else if self
            .walk(new_result, current_index + 1, Operator::Multiply, part)
            .is_some()
        {
            return Some(());
        } else {
            match &part {
                Part::Two => {
                    if self
                        .walk(new_result, current_index + 1, Operator::Concat, part)
                        .is_some()
                    {
                        return Some(());
                    }
                }
                _ => (),
            }
        }
        None
    }
}

pub struct Day07 {
    equations: Vec<Equation>,
}

impl Day07 {
    pub fn new(input: &String) -> Self {
        Self {
            equations: input
                .trim()
                .lines()
                .map(|l| Equation::from_str(l).unwrap())
                .collect(),
        }
    }
}

impl PuzzleParts for Day07 {
    fn part_one(&mut self) -> String {
        self.equations
            .iter()
            .filter_map(|e| {
                if e.walk(0, 0, Operator::Add, &Part::One).is_some() {
                    return Some(e.result);
                } else if e.walk(0, 0, Operator::Multiply, &Part::One).is_some() {
                    return Some(e.result);
                } else {
                    return None;
                }
            })
            .sum::<isize>()
            .to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        Some(
            self.equations
                .iter()
                .filter_map(|e| {
                    if e.walk(0, 0, Operator::Add, &Part::Two).is_some() {
                        return Some(e.result);
                    } else if e.walk(0, 0, Operator::Multiply, &Part::Two).is_some() {
                        return Some(e.result);
                    } else if e.walk(0, 0, Operator::Concat, &Part::Two).is_some() {
                        return Some(e.result);
                    } else {
                        return None;
                    }
                })
                .sum::<isize>()
                .to_string(),
        )
    }
}
