use std::str::FromStr;

use common::{ParsePuzzleErr, PuzzleParts};

#[derive(Debug, PartialEq, Eq)]
struct Rule {
    x: isize,
    y: isize,
}

impl FromStr for Rule {
    type Err = ParsePuzzleErr;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let binding = s[11..].replace("Y", "");
        let mut rule_part = binding.split(", ");
        Ok(Self {
            x: rule_part.next().unwrap().parse().unwrap(),
            y: rule_part.next().unwrap().parse().unwrap(),
        })
    }
}

impl Rule {
    fn get_target(s: &str) -> Self {
        let binding = s[9..].replace("Y=", "");
        let mut rule_part = binding.split(", ");
        Self {
            x: rule_part.next().unwrap().parse().unwrap(),
            y: rule_part.next().unwrap().parse().unwrap(),
        }
    }
}

#[derive(Debug)]
struct Crane {
    a: Rule,
    b: Rule,
    target: Rule,
}

impl FromStr for Crane {
    type Err = ParsePuzzleErr;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut lines = s.trim().lines();
        let a = Rule::from_str(lines.next().unwrap()).unwrap();
        let b = Rule::from_str(lines.next().unwrap()).unwrap();
        let target = Rule::get_target(lines.next().unwrap());

        Ok(Self { a, b, target })
    }
}

impl Crane {
    fn get_total(&self, qty_a: isize, qty_b: isize) -> Rule {
        Rule {
            x: self.a.x * qty_a + self.b.x * qty_b,
            y: self.a.y * qty_a + self.b.y * qty_b,
        }
    }

    fn get_combo(&self) -> isize {
        let qty_b = (self.a.x * self.target.y - self.target.x * self.a.y)
            / (self.b.y * self.a.x - self.a.y * self.b.x);
        let qty_a = (self.target.x - qty_b * self.b.x) / self.a.x;

        let total = self.get_total(qty_a, qty_b);
        match total == self.target {
            true => 3 * qty_a + qty_b,
            false => 0,
        }
    }
}

pub struct Day13 {
    cranes: Vec<Crane>,
}

impl Day13 {
    pub fn new(input: &String) -> Self {
        Self {
            cranes: input
                .split("\n\n")
                .map(|c| Crane::from_str(c).unwrap())
                .collect(),
        }
    }
}

impl PuzzleParts for Day13 {
    fn part_one(&mut self) -> String {
        self.cranes
            .iter()
            .map(|c| c.get_combo())
            .sum::<isize>()
            .to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        Some(
            self.cranes
                .iter_mut()
                .map(|c| {
                    c.target.x += 10000000000000;
                    c.target.y += 10000000000000;
                    c.get_combo()
                })
                .sum::<isize>()
                .to_string(),
        )
    }
}
