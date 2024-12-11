use std::collections::HashMap;

use common::PuzzleParts;

enum Rule {
    Zero(usize),
    Split((usize, usize)),
    Multiply(usize),
}

pub struct Day11 {
    values: Vec<usize>,
    seen_results: HashMap<(usize, usize), usize>,
}

impl Day11 {
    pub fn new(input: &String) -> Self {
        Self {
            values: input
                .trim()
                .split(" ")
                .map(|v| v.parse().unwrap())
                .collect(),
            seen_results: HashMap::new(),
        }
    }

    fn process(&mut self, value: usize, current_count: usize, target_count: usize) -> usize {
        if let Some(r) = self.seen_results.get(&(current_count, value)) {
            return *r;
        }
        if current_count == target_count {
            return 1;
        }
        let res = match self.get_rule(value) {
            Rule::Zero(val) => self.process(val, current_count + 1, target_count),
            Rule::Split((first, second)) => {
                self.process(first, current_count + 1, target_count)
                    + self.process(second, current_count + 1, target_count)
            }
            Rule::Multiply(val) => self.process(val, current_count + 1, target_count),
        };
        self.seen_results.insert((current_count, value), res);
        res
    }
    fn get_rule(&mut self, value: usize) -> Rule {
        if value == 0 {
            return Rule::Zero(1);
        }
        let len = value.checked_ilog10();

        if let Some(val) = len {
            if val % 2 == 1 {
                let pow_10 = 10usize.pow(val / 2 + 1);
                let first = value / pow_10;
                return Rule::Split((first, value - first * pow_10));
            }
        }

        Rule::Multiply(value * 2024)
    }
}

impl PuzzleParts for Day11 {
    fn part_one(&mut self) -> String {
        self.values
            .clone()
            .iter()
            .map(|v| self.process(*v, 0, 25))
            .sum::<usize>()
            .to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        Some(
            self.values
                .clone()
                .iter()
                .map(|v| self.process(*v, 0, 75))
                .sum::<usize>()
                .to_string(),
        )
    }
}
