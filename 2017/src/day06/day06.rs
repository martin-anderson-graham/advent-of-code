use std::collections::HashMap;

use common::PuzzleParts;

#[derive(Debug, PartialEq, Eq)]
struct Hashed {
    step: usize,
    count: usize,
}

#[derive(Debug)]
pub struct Day06 {
    blocks: Vec<usize>,
    seen: HashMap<String, Hashed>,
}

impl PuzzleParts for Day06 {
    fn new(input: &String) -> Self {
        Self {
            blocks: Day06::parse(input),
            seen: HashMap::new(),
        }
    }

    fn part_one(&mut self) -> String {
        self.process(2)
    }

    fn part_two(&mut self) -> Option<String> {
        Some(self.process(3))
    }
}
impl Day06 {
    fn parse(input: &String) -> Vec<usize> {
        input
            .split_whitespace()
            .map(|c| c.parse().unwrap())
            .collect()
    }
    fn get_hash_key_for_blocks(blocks: &Vec<usize>) -> String {
        format! {"{:?}", blocks}
    }

    fn cycle(&mut self) {
        let mut max_block_index = 0;
        let mut max_block_count = 0;
        self.blocks.iter().enumerate().for_each(|(i, v)| {
            if *v > max_block_count {
                max_block_count = *v;
                max_block_index = i;
            };
        });
        // set current one to zero
        self.blocks[max_block_index] = 0;
        let mut current_index = (max_block_index + 1) % self.blocks.len();
        while max_block_count > 0 {
            self.blocks[current_index] += 1;
            current_index = (current_index + 1) % self.blocks.len();
            max_block_count -= 1;
        }
    }

    fn process(&mut self, target: usize) -> String {
        let mut redistribution_count: usize = 0;
        loop {
            let hash_key = Day06::get_hash_key_for_blocks(&self.blocks);

            let hashed_value = self.seen.get_mut(&hash_key);

            match hashed_value {
                Some(hashed) => {
                    if target == 2 {
                        return redistribution_count.to_string();
                    }
                    if hashed.count + 1 == target {
                        return (redistribution_count - hashed.step).to_string();
                    }
                    hashed.step = redistribution_count;
                    hashed.count += 1;
                }
                None => {
                    self.seen.insert(
                        hash_key.clone(),
                        Hashed {
                            step: redistribution_count,
                            count: 1,
                        },
                    );
                    ()
                }
            };

            redistribution_count += 1;
            self.cycle();
        }
    }
}
