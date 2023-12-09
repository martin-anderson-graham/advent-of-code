use std::str::FromStr;

use puzzle::puzzle::Sequence;

mod puzzle;

fn main() {
    println!("Hello, world!");
}

fn part_one(raw: &str) -> isize {
    let puzzle = raw
        .lines()
        .map(|l| Sequence::from_str(l).unwrap())
        .collect::<Vec<_>>();
    puzzle.iter().map(|s| s.find_next()).sum()
}

fn part_two(raw: &str) -> isize {
    let puzzle = raw
        .lines()
        .map(|l| Sequence::from_str(l).unwrap())
        .collect::<Vec<_>>();
    puzzle.iter().map(|s| s.find_prev()).sum()
}

#[cfg(test)]
mod tests {
    use crate::{part_one, part_two};

    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 114);
    }

    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input), 1887980197);
    }

    #[test]
    fn part_two_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_two(input), 2);
    }

    #[test]
    fn part_two_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_two(input), 990);
    }
}
