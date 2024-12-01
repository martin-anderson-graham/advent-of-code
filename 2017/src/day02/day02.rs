use common::PuzzleParts;

pub struct Day02 {
    input: String,
}
impl Day02 {
 pub   fn new(input: &String) -> Self {
        Self {
            input: input.clone(),
        }
    }
    
}

impl PuzzleParts for Day02 {
    fn part_one(&mut self) -> String {
        part_one(&self.input).to_string()
    }
    fn part_two(&mut self) -> Option<String> {
        Some(part_two(&self.input).to_string())
    }
}

pub fn part_one(input: &String) -> usize {
    parse_input(input)
        .into_iter()
        .map(|row| {
            let max = row.iter().max().unwrap();
            let min = row.iter().min().unwrap();
            max - min
        })
        .sum()
}

pub fn part_two(input: &String) -> usize {
    parse_input(input)
        .into_iter()
        .map(|row| {
            for first in 0..row.len() - 1 {
                for second in first + 1..row.len() {
                    let first_val = row[first];
                    let second_val = row[second];
                    if first_val % second_val == 0 {
                        return first_val / second_val;
                    } else if second_val % first_val == 0 {
                        return second_val / first_val;
                    }
                }
            }
            return 0;
        })
        .sum()
}

fn parse_input(input: &String) -> Vec<Vec<usize>> {
    input
        .trim()
        .lines()
        .map(|l| {
            l.trim()
                .split_whitespace()
                .map(|c| c.parse::<usize>().unwrap())
                .collect()
        })
        .collect()
}
