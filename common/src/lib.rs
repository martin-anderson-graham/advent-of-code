pub enum Part {
    One,
    Two,
}

#[derive(Debug, Clone, Hash, PartialEq, Eq)]
pub struct Position {
    pub row: isize,
    pub col: isize,
}

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord, Hash, Clone)]
pub enum CardinalDirection {
    Up,
    Down,
    Left,
    Right,
}

impl Position {
    pub fn new(row: isize, col: isize) -> Self {
        Self { row, col }
    }
}

#[derive(Debug)]
pub struct ParsePuzzleErr;

pub trait PuzzleParts {
    fn part_one(&mut self) -> String;
    fn part_two(&mut self) -> Option<String>;
}
