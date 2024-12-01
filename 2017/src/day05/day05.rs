use std::collections::HashMap;

use common::PuzzleParts;

pub struct Day05 {
    cursor_index: isize,
    instructions: HashMap<isize, isize>,
}

impl Day05 {
 pub   fn new(input: &String) -> Self {
        Self {
            cursor_index: 0,
            instructions: Day05::parse(input),
        }
    }

}

impl PuzzleParts for Day05 {
    fn part_one(&mut self) -> String {
        let mut step_count = 0;
        loop {
            let current_index = &self.cursor_index;
            let jump = match self.instructions.get(&current_index) {
                None => return step_count.to_string(),
                Some(val) => val,
            }.clone();
            step_count += 1;
            // increment before moving
            self.instructions.insert(*current_index, jump + 1);
            self.cursor_index += jump;
        }
    }
    fn part_two(&mut self) -> Option<String> {
        let mut step_count = 0;
        loop {
            let current_index = &self.cursor_index;
            let jump = match self.instructions.get(&current_index) {
                None => return Some(step_count.to_string()),
                Some(val) => val,
            }.clone();
            step_count += 1;
            // increment before moving
            match jump >= 3 {
                true=>self.instructions.insert(*current_index, jump - 1),
                false=>self.instructions.insert(*current_index, jump + 1)
            };
            self.cursor_index += jump;
        }
    }
}

impl Day05 {
    fn parse(input: &String) ->  HashMap<isize, isize> {
        let mut instructions = HashMap::new();
        for (index, value) in input.trim().split_whitespace().enumerate() {
            instructions.insert(index.try_into().unwrap(), value.parse::<isize>().unwrap());
        }
        return instructions;
    }

}
