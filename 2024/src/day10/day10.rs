use std::collections::{HashMap, HashSet};

use common::{Position, PuzzleParts};

#[derive(Debug)]
struct Location {
    height: usize,
}

trait PositionDay10 {
    fn get_cardinals(&self) -> Vec<Position>;
}

impl PositionDay10 for Position {
    fn get_cardinals(&self) -> Vec<Position> {
        vec![
            Position::new(self.row, self.col + 1),
            Position::new(self.row, self.col - 1),
            Position::new(self.row + 1, self.col),
            Position::new(self.row - 1, self.col),
        ]
    }
}

pub struct Day10 {
    locations: HashMap<Position, Location>,
}

impl Day10 {
    pub fn new(input: &String) -> Self {
        let mut locations = HashMap::new();
        input
            .trim()
            .lines()
            .enumerate()
            .for_each(|(row_index, row_line)| {
                row_line
                    .trim()
                    .chars()
                    .enumerate()
                    .for_each(|(col_index, c)| {
                        let pos = Position::new(
                            row_index.try_into().unwrap(),
                            col_index.try_into().unwrap(),
                        );
                        locations.insert(
                            pos.clone(),
                            Location {
                                height: c.to_string().parse().unwrap(),
                            },
                        );
                    })
            });

        Self { locations }
    }

    fn get_starting_positions(&self) -> Vec<Position> {
        self.locations
            .iter()
            .filter_map(|(pos, loc)| match loc.height == 0 {
                true => Some(pos.clone()),
                false => None,
            })
            .collect()
    }

    // returns the position of the nine
    fn walk(&self, pos: &Position, target_height: usize, nines: &mut HashSet<Position>) {
        let current_loc = match self.locations.get(pos) {
            Some(l) => l,
            None => return,
        };

        if current_loc.height != target_height {
            return;
        };
        if current_loc.height == 9 {
            nines.insert(pos.clone());
            return;
        };

        pos.get_cardinals()
            .iter()
            .for_each(|p| self.walk(p, current_loc.height + 1, nines));
    }
    fn walk_two(&self, pos: &Position, target_height: usize) -> Option<usize> {
        let current_loc = match self.locations.get(pos) {
            Some(l) => l,
            None => return None,
        };

        if current_loc.height != target_height {
            return None;
        };
        if current_loc.height == 9 {
            return Some(1);
        };

        let count = pos
            .get_cardinals()
            .iter()
            .filter_map(|p| self.walk_two(p, current_loc.height + 1))
            .sum();

        match count {
            0 => None,
            val => Some(val),
        }
    }
}

impl PuzzleParts for Day10 {
    fn part_one(&mut self) -> String {
        let starting_positions = self.get_starting_positions();
        let mut trail_sums: Vec<usize> = vec![];

        starting_positions.iter().for_each(|pos| {
            let mut nines: HashSet<Position> = HashSet::new();
            self.walk(&pos, 0, &mut nines);
            trail_sums.push(nines.iter().count());
        });

        trail_sums.iter().sum::<usize>().to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        let starting_positions = self.get_starting_positions();

        Some(
            starting_positions
                .iter()
                .filter_map(|pos| self.walk_two(&pos, 0))
                .sum::<usize>()
                .to_string(),
        )
    }
}
