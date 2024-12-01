use std::collections::HashMap;

use common::PuzzleParts;

pub struct Day01 {
    list_one: Vec<isize>,
    list_two: Vec<isize>,
    hash_two: HashMap<isize, isize>,
}

impl Day01 {
    pub fn new(input: &String) -> Self {
        let mut list_one = vec![];
        let mut list_two = vec![];

        input.trim().lines().for_each(|line| {
            let mut items = line.split_whitespace();

            list_one.push(
                items
                    .next()
                    .expect("Didn't find the first item")
                    .parse::<isize>()
                    .expect("Found a non-numerical item"),
            );
            list_two.push(
                items
                    .next()
                    .expect("Didn't find the second item")
                    .parse::<isize>()
                    .expect("Found a non-numerical item"),
            );
        });

        let mut hash_two = HashMap::new();
        list_two.iter().for_each(|val| {
            match hash_two.get(val) {
                Some(count) => hash_two.insert(*val, count + 1),
                None => hash_two.insert(*val, 1),
            };
        });

        Self {
            list_one,
            list_two,
            hash_two,
        }
    }
}

impl PuzzleParts for Day01 {
    fn part_one(&mut self) -> String {
        let mut sum = 0;

        self.list_one.sort();
        self.list_two.sort();

        for i in 0..self.list_one.len() {
            sum += (self.list_two[i] - self.list_one[i]).abs()
        }

        sum.to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        let mut total = 0;
        self.list_one.iter().for_each(|val| {
            match self.hash_two.get(val){
                Some(count) => total += *val * count,
                None => (),
            };
        });

            Some(total.to_string())
    }
}
