use std::collections::{HashMap, HashSet};

use common::{Part, PuzzleParts};

enum Direction {
    UpLeft,
    UpRight,
    DownLeft,
    DownRight,
}

#[derive(PartialEq, Eq, Hash, Clone)]
struct Position {
    row: isize,
    col: isize,
}

impl Position {
    fn new(row: isize, col: isize) -> Self {
        Self { row, col }
    }
    fn get_new_position(
        &self,
        direction: &Direction,
        row_diff: isize,
        col_diff: isize,
    ) -> Position {
        match direction {
            Direction::UpLeft => Self {
                row: self.row - row_diff,
                col: self.col - col_diff,
            },
            Direction::UpRight => Self {
                row: self.row - row_diff,
                col: self.col + col_diff,
            },
            Direction::DownLeft => Self {
                row: self.row + row_diff,
                col: self.col - col_diff,
            },
            Direction::DownRight => Self {
                row: self.row + row_diff,
                col: self.col + col_diff,
            },
        }
    }
}

struct Antenna {
    position: Position,
    frequency: char,
}

impl Antenna {}

pub struct Day08 {
    antennas: HashMap<char, Vec<Antenna>>,
    num_rows: isize,
    num_cols: isize,
    antinodes: HashMap<Position, char>,
}

impl Day08 {
    pub fn new(input: &String) -> Self {
        let mut antennas: HashMap<char, Vec<Antenna>> = HashMap::new();
        let mut num_rows: isize = 0;
        let mut num_cols: isize = 0;

        input
            .trim()
            .lines()
            .enumerate()
            .for_each(|(row_index, row_line)| {
                num_rows = row_index.try_into().unwrap();
                row_line
                    .trim()
                    .chars()
                    .enumerate()
                    .for_each(|(col_index, char)| {
                        num_cols = col_index.try_into().unwrap();
                        match char {
                            '.' => (),
                            c => {
                                let a = Antenna {
                                    position: Position::new(
                                        row_index.try_into().unwrap(),
                                        col_index.try_into().unwrap(),
                                    ),
                                    frequency: c,
                                };
                                match antennas.get_mut(&c) {
                                    Some(ants) => {
                                        ants.push(a);
                                    }
                                    None => {
                                        antennas.insert(c, vec![a]);
                                    }
                                };
                            }
                        };
                    });
            });

        Self {
            antennas,
            antinodes: HashMap::new(),
            num_rows,
            num_cols,
        }
    }

    fn generate_antinodes(&mut self, part: Part) {
        let mut antinodes: HashMap<Position, char> = HashMap::new();
        self.antennas.values().for_each(|antennas| {
            self.get_all_antinode_positions(antennas, &part)
                .iter()
                .for_each(|p| {
                    antinodes.insert(p.clone(), antennas.first().unwrap().frequency);
                });
        });

        self.antinodes = antinodes;
    }

    fn get_unique_antinodes(&self) -> usize {
        self.antinodes.keys().collect::<HashSet<_>>().len()
    }

    fn is_in_grid(&self, pos: &Position) -> bool {
        if pos.row < 0 || pos.row > self.num_rows {
            return false;
        } else if pos.col < 0 || pos.col > self.num_cols {
            return false;
        } else {
            return true;
        }
    }

    fn get_antinode_positions_in_direction(
        &self,
        ant: &Antenna,
        direction: &Direction,
        row_diff: isize,
        col_diff: isize,
        part: &Part,
    ) -> Vec<Position> {
        let mut nodes = vec![];
        let mut current = ant.position.clone();
        loop {
            let new_node = current.get_new_position(direction, row_diff, col_diff);
            if !self.is_in_grid(&new_node) {
                return nodes;
            }
            nodes.push(new_node.clone());
            current = new_node;
            match part {
                Part::One => return nodes,
                Part::Two => (),
            };
        }
    }

    fn get_antinode_positions(
        &self,
        first: &Antenna,
        other: &Antenna,
        part: &Part,
    ) -> Vec<Position> {
        let row_diff: isize = first
            .position
            .row
            .abs_diff(other.position.row)
            .try_into()
            .unwrap();
        let col_diff: isize = first
            .position
            .col
            .abs_diff(other.position.col)
            .try_into()
            .unwrap();

        let (first_dir, second_dir): (Direction, Direction) = match (
            first.position.row <= other.position.row,
            first.position.col <= other.position.col,
        ) {
            // self is left and above
            (true, true) => (Direction::UpLeft, Direction::DownRight),
            // self is left and below
            (false, true) => (Direction::DownLeft, Direction::UpRight),
            // self is right and above
            (true, false) => (Direction::UpRight, Direction::DownLeft),
            // self is right and below
            (false, false) => (Direction::DownRight, Direction::UpLeft),
        };
        match part {
            Part::One => [
                self.get_antinode_positions_in_direction(
                    first, &first_dir, row_diff, col_diff, part,
                ),
                self.get_antinode_positions_in_direction(
                    other,
                    &second_dir,
                    row_diff,
                    col_diff,
                    part,
                ),
            ]
            .concat(),
            Part::Two => [
                self.get_antinode_positions_in_direction(
                    first, &first_dir, row_diff, col_diff, part,
                ),
                self.get_antinode_positions_in_direction(
                    other,
                    &second_dir,
                    row_diff,
                    col_diff,
                    part,
                ),
                vec![first.position.clone(), other.position.clone()],
            ]
            .concat(),
        }
    }

    fn get_all_antinode_positions(&self, antennas: &Vec<Antenna>, part: &Part) -> Vec<Position> {
        let mut all_antinodes = vec![];
        for first in 0..antennas.len() - 1 {
            for second in first + 1..antennas.len() {
                let first_ant = antennas.get(first).expect("first antenna");
                let second_ant = antennas.get(second).expect("second antenna");

                self.get_antinode_positions(first_ant, second_ant, part)
                    .iter()
                    .for_each(|p| all_antinodes.push(p.clone()));
            }
        }
        all_antinodes
    }
}

impl PuzzleParts for Day08 {
    fn part_one(&mut self) -> String {
        self.generate_antinodes(Part::One);
        self.get_unique_antinodes().to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        self.generate_antinodes(Part::Two);
        Some(self.get_unique_antinodes().to_string())
    }
}
