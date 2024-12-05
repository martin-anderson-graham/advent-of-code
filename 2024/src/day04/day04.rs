use std::collections::HashMap;

use common::PuzzleParts;

enum Direction {
    Up,
    Down,
    Left,
    Right,
    UpLeft,
    UpRight,
    DownLeft,
    DownRight,
}

static TARGET_WORD: [char; 4] = ['X', 'M', 'A', 'S'];

static DIRECTIONS: [Direction; 8] = [
    Direction::Up,
    Direction::Down,
    Direction::Left,
    Direction::Right,
    Direction::UpLeft,
    Direction::UpRight,
    Direction::DownLeft,
    Direction::DownRight,
];

impl Direction {
    fn get_delta(&self) -> (isize, isize) {
        match self {
            Direction::Up => (-1, 0),
            Direction::Down => (1, 0),
            Direction::Left => (0, -1),
            Direction::Right => (0, 1),
            Direction::UpLeft => (-1, -1),
            Direction::UpRight => (-1, 1),
            Direction::DownLeft => (1, -1),
            Direction::DownRight => (1, 1),
        }
    }
}

pub struct Day04 {
    board: HashMap<isize, HashMap<isize, char>>,
}

impl Day04 {
    pub fn new(input: &String) -> Self {
        let mut board = HashMap::new();
        input.trim().lines().enumerate().for_each(|(row, line)| {
            let mut row_map = HashMap::new();
            line.chars().enumerate().for_each(|(col, char)| {
                row_map.insert(col as isize, char);
            });
            board.insert(row as isize, row_map);
        });
        Self { board }
    }

    fn get(&self, row: isize, col: isize) -> Option<&char> {
        match self.board.get(&row) {
            Some(row) => row.get(&col),
            None => None,
        }
    }

    fn get_match_count_from_spot(&self, row: &isize, col: &isize) -> usize {
        DIRECTIONS
            .iter()
            .filter_map(|d| self.get_is_match(row, col, d))
            .count()
    }

    fn get_is_match(&self, row: &isize, col: &isize, direction: &Direction) -> Option<bool> {
        let mut current_row = row.clone();
        let mut current_col = col.clone();

        let delta = direction.get_delta();

        for c in TARGET_WORD.iter() {
            match self.get(current_row, current_col) {
                Some(v) => {
                    if v != c {
                        return None;
                    }
                }
                None => return None,
            }
            current_row += delta.0;
            current_col += delta.1;
        }
        return Some(true);
    }

    fn get_is_x(&self, row: isize, col: isize) -> Option<bool> {
        // we must have an 'A' in the middle
        match self.get(row, col) {
            Some(val) => {
                if *val != 'A' {
                    return None;
                }
            }
            None => return None,
        };

        // now check the pairs of corners
        match (self.get(row - 1, col - 1), self.get(row + 1, col + 1)) {
            (Some(upper_left), Some(lower_right)) => match (upper_left, lower_right) {
                ('M', 'S') => (),
                ('S', 'M') => (),
                _ => return None,
            },
            _ => return None,
        };

        // now check the pairs of corners
        match (self.get(row + 1, col - 1), self.get(row - 1, col + 1)) {
            (Some(lower_left), Some(upper_right)) => match (lower_left, upper_right) {
                ('M', 'S') => (),
                ('S', 'M') => (),
                _ => return None,
            },
            _ => return None,
        };

        Some(true)
    }
}

impl PuzzleParts for Day04 {
    fn part_one(&mut self) -> String {
        self.board
            .iter()
            .map(|(row_index, row)| {
                row.keys()
                    .map(|col_index| self.get_match_count_from_spot(&row_index, &col_index))
                    .sum::<usize>()
            })
            .sum::<usize>()
            .to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        Some(
            self.board
                .iter()
                .map(|(row_index, row)| {
                    row.keys()
                        .filter_map(|col_index| self.get_is_x(*row_index, *col_index))
                        .count()
                })
                .sum::<usize>()
                .to_string(),
        )
    }
}
