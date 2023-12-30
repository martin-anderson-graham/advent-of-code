#![allow(dead_code)]

use std::str::FromStr;

use puzzle::puzzle::Puzzle;

mod puzzle;

fn main() {
    let raw = include_str!("ex1.txt");
    let mut puzzle = Puzzle::from_str(raw).unwrap();
    puzzle.process();
    println!("{}", puzzle.score());
}

fn part_one(raw: &str) -> usize {
    let mut puzzle = Puzzle::from_str(raw).unwrap();
    puzzle.process();
    puzzle.score()
}

#[cfg(test)]
mod tests {
    use crate::part_one;

    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 102);
    }
}
