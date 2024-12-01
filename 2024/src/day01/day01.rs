use std::collections::{BinaryHeap, HashMap};

use common::PuzzleParts;
use itertools::Itertools;

pub struct Day01 {
    list_one: BinaryHeap<usize>,
    list_two: BinaryHeap<usize>,
    hash_two: HashMap<usize, usize>,
}

impl Day01 {
    pub fn new(input: &String) -> Self {
        let lists: (BinaryHeap<usize>, BinaryHeap<usize>) = input
            .trim()
            .lines()
            .map(|line| {
                line.split_once("   ")
                    .map(|(l, r)| (r.parse::<usize>().unwrap(), l.parse::<usize>().unwrap()))
                    .unwrap()
            })
            .unzip();
        let hash_two = lists.1.iter().map(|v| *v).counts();

        Self {
            list_one: lists.0,
            list_two: lists.1,
            hash_two,
        }
    }
}

impl PuzzleParts for Day01 {
    fn part_one(&mut self) -> String {
        self.list_one
            .clone()
            .into_sorted_vec()
            .iter()
            .zip(self.list_two.clone().into_sorted_vec().iter())
            .map(|(l, r)| l.abs_diff(*r))
            .sum::<usize>()
            .to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        Some(
            self.list_one
                .iter()
                .map(|val| self.hash_two.get(val).unwrap_or(&0) * *val)
                .sum::<usize>()
                .to_string(),
        )
    }
}
