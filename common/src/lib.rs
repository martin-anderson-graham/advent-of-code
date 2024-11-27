pub trait PuzzleParts {
    fn part_one(&self) -> String;
    fn part_two(&self) -> Option<String>;
    fn new(input: &String) -> Self;
}

pub trait YearPuzzle {
    fn new(day: &String, input: &String) -> Self;
    fn part_one(&self) -> String;
    fn part_two(&self) -> Option<String>;
}
