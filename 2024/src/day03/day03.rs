use std::collections::{HashMap, HashSet};

use common::PuzzleParts;

pub struct Day03 {
    input: String,
}

impl Day03 {
    pub fn new(input: &String) -> Self {
        Self {
            input: input.clone(),
        }
    }
}

impl PuzzleParts for Day03 {
    fn part_one(&mut self) -> String {
        let mut result = 0;
        for (i, _) in self.input.match_indices("mul(") {
            let first_number = self.input[i + 4..]
                .chars()
                .take_while(|c| c.is_numeric())
                .map(|c| c.to_string())
                .collect::<Vec<_>>()
                .join("");

            if first_number.len() == 0 {
                continue;
            }

            let comma = self.input.chars().nth(i + 4 + first_number.len());

            if comma.is_none() {
                continue;
            } else if comma != Some(',') {
                continue;
            }

            let second_number = self.input[i + 4 + first_number.len() + 1..]
                .chars()
                .take_while(|c| c.is_numeric())
                .map(|c| c.to_string())
                .collect::<Vec<_>>()
                .join("");

            if second_number.len() == 0 {
                continue;
            }

            let closing_parens = self
                .input
                .chars()
                .nth(i + 4 + first_number.len() + 1 + second_number.len());

            if closing_parens.is_none() {
                continue;
            } else if closing_parens != Some(')') {
                continue;
            }

            match (
                first_number.parse::<usize>(),
                second_number.parse::<usize>(),
            ) {
                (Ok(first), Ok(second)) => result += first * second,
                _ => continue,
            };
        }

        result.to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        let mut muls: HashMap<usize, usize> = HashMap::new();
        for (i, _) in self.input.match_indices("mul(") {
            let first_number = self.input[i + 4..]
                .chars()
                .take_while(|c| c.is_numeric())
                .map(|c| c.to_string())
                .collect::<Vec<_>>()
                .join("");

            if first_number.len() == 0 {
                continue;
            }

            let comma = self.input.chars().nth(i + 4 + first_number.len());

            if comma.is_none() {
                continue;
            } else if comma != Some(',') {
                continue;
            }

            let second_number = self.input[i + 4 + first_number.len() + 1..]
                .chars()
                .take_while(|c| c.is_numeric())
                .map(|c| c.to_string())
                .collect::<Vec<_>>()
                .join("");

            if second_number.len() == 0 {
                continue;
            }

            let closing_parens = self
                .input
                .chars()
                .nth(i + 4 + first_number.len() + 1 + second_number.len());

            if closing_parens.is_none() {
                continue;
            } else if closing_parens != Some(')') {
                continue;
            }

            match (
                first_number.parse::<usize>(),
                second_number.parse::<usize>(),
            ) {
                (Ok(first), Ok(second)) => muls.insert(i, first * second),
                _ => continue,
            };
        }

        let dos: HashSet<usize> = self.input.match_indices("do()").map(|(i, _)| i).collect();
        let donts: HashSet<usize> = self
            .input
            .match_indices("don't()")
            .map(|(i, _)| i)
            .collect();

        let mut result = 0;
        let mut active = true;

        for i in 0..self.input.len() {
            if dos.get(&i).is_some() {
                active = true;
            } else if donts.get(&i).is_some() {
                active = false
            } else if let Some(product) = muls.get(&i) {
                if active {
                    result += product;
                }
            }
        }

        Some(result.to_string())
    }
}
