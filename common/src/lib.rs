#[derive(Debug)]
pub struct ParsePuzzleErr;

pub trait PuzzleParts {
    fn part_one(&mut self) -> String;
    fn part_two(&mut self) -> Option<String>;
}
