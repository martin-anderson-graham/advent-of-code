use std::str::FromStr;

use common::{ParsePuzzleErr, PuzzleParts};
use itertools::Itertools;

struct Report {
    values: Vec<usize>,
}

impl FromStr for Report {
    type Err = ParsePuzzleErr;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        Ok(Self {
            values: s
                .trim()
                .split_whitespace()
                .map(|v| v.parse::<usize>().unwrap())
                .collect(),
        })
    }
}

impl Report {
    fn is_safe(&self) -> bool {
        let is_increasing = self.values.iter().is_sorted_by(|a, b| a < b);
        let is_decreasing = self.values.iter().is_sorted_by(|a, b| a > b);

        if !is_increasing && !is_decreasing {
            return false;
        }

        self.values
            .iter()
            .tuple_windows::<(_, _)>()
            .fold(true, |acc, val| {
                if !acc {
                    return false;
                } else {
                    let diff = val.0.abs_diff(*val.1);
                    return diff > 0 && diff < 4;
                }
            })
    }
}

pub struct Day02 {
    reports: Vec<Report>,
}

impl Day02 {
    pub fn new(input: &String) -> Self {
        Self {
            reports: input
                .trim()
                .lines()
                .map(|l| Report::from_str(l).unwrap())
                .collect(),
        }
    }
}

impl PuzzleParts for Day02 {
    fn part_one(&mut self) -> String {
        self.reports
            .iter()
            .filter(|r| r.is_safe())
            .count()
            .to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        Some(
            self.reports
                .iter()
                .filter(|r| {
                    let full = r.is_safe();
                    if full {
                        return true;
                    }

                    // we remove elements one at a time
                    for i in 0..r.values.len() {
                        if (Report {
                            values: r
                                .values
                                .iter()
                                .enumerate()
                                .filter_map(|(index, val)| match index != i {
                                    true => Some(*val),
                                    false => None,
                                })
                                .collect(),
                        })
                        .is_safe()
                        {
                            return true;
                        }
                    }
                    false
                })
                .count()
                .to_string(),
        )
    }
}
