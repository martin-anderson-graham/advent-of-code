use std::str::FromStr;

use puzzle::puzzle::Puzzle;

mod puzzle;

fn main() {}

fn part_one(raw: &str) -> i32 {
    let mut puzz = Puzzle::from_str(raw).unwrap();
    puzz.score(true)
}

fn part_two(raw: &str) -> i32 {
    let mut puzz = Puzzle::from_str(raw).unwrap();
    puzz.score(false)
}

#[cfg(test)]
mod tests {
    use crate::{part_one, part_two};

    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 13);
    }
    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input), 33950);
    }

    #[test]
    fn part_two_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_two(input), 30);
    }
    #[test]
    fn part_two_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_two(input), 14814534);
    }
}
