use std::{cmp::Ordering, collections::HashSet};

use common::PuzzleParts;

pub struct Day05 {
    ordering_rules: HashSet<(String, String)>,
    updates: Vec<Vec<String>>,
}

impl Day05 {
    pub fn new(input: &String) -> Self {
        let (ordering_rules_lines, updates_lines) = input.trim().split_once("\n\n").unwrap();
        let mut ordering_rules = HashSet::new();
        ordering_rules_lines.lines().for_each(|l| {
            let (first, second) = l.split_once("|").unwrap();
            ordering_rules.insert((first.to_string(), second.to_string()));
        });
        let updates = updates_lines
            .lines()
            .map(|l| l.split(',').map(|c| c.to_string()).collect::<Vec<_>>())
            .collect();

        Self {
            ordering_rules,
            updates,
        }
    }

    fn update_is_valid(&self, update: &Vec<String>) -> Option<()> {
        for (start_index, start) in update.iter().enumerate() {
            for end_index in start_index + 1..update.len() {
                let end = update.get(end_index).unwrap();
                match self
                    .ordering_rules
                    .get(&(end.to_string(), start.to_string()))
                {
                    Some(_) => return None,
                    None => (),
                };
            }
        }
        Some(())
    }

    fn score_update(update: &Vec<String>) -> usize {
        let middle_index = update.len() / 2;
        update.get(middle_index).unwrap().parse().unwrap()
    }

    fn compare_update_items(&self, a: &String, b: &String) -> Ordering {
        match self.ordering_rules.get(&(a.to_string(),b.to_string())) {
            Some(_) => Ordering::Less,
            None => Ordering::Equal,
        }

    }
}


impl PuzzleParts for Day05 {
    fn part_one(&mut self) -> String {
        self.updates
            .iter()
            .filter_map(|update| match self.update_is_valid(update) {
                Some(_) => Some(Day05::score_update(update)),
                None => None,
            })
            .sum::<usize>()
            .to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        Some(
            self.updates
                .iter()
                .filter_map(|update| match self.update_is_valid(update) {
                    None => {
                        let mut new_update = update.clone();
                        new_update.sort_by(|a, b| self.compare_update_items(a, b));
                        Some(Day05::score_update(&new_update))
                    }
                    Some(_) => None,
                })
                .sum::<usize>()
                .to_string(),
        )
    }
}
