#![allow(dead_code)]

use std::str::FromStr;

use lagoon::lagoon::Lagoon;

mod lagoon;
fn main() {
    println!("Hello, world!");
}

fn part_one(raw: &str) -> usize {
    let mut lagoon = Lagoon::from_str(raw).unwrap();
    lagoon.dig();
    lagoon.fill_in();
    lagoon.score()
}

fn part_two(raw: &str) -> usize {
    let mut lagoon = Lagoon::new(raw);
    lagoon.dig();
    lagoon.fill_in();
    lagoon.score()
}


#[cfg(test)]
mod tests {
    use crate::{part_one, part_two};

    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 62);
    }

    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input) < 102222, true);
        assert_eq!(part_one(input), 52035);
    }

    #[test]
    fn part_two_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_two(input), 952408144115);
    }
}
