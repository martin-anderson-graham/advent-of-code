pub trait PuzzleParts {
    fn part_one(&mut self) -> String;
    fn part_two(&mut self) -> Option<String>;
    fn new(input: &String) -> Self;
}

pub trait YearPuzzle {
    fn new(day: &String, input: &String) -> Self;
    fn part_one(&mut self) -> String;
    fn part_two(&mut self) -> Option<String>;
}
