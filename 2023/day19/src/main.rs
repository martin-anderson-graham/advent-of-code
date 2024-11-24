#![allow(dead_code)]

use std::str::FromStr;

use machine::machine::Machine;
mod machine;

fn main() {
    println!("Hello, world!");
}

fn part_one(raw: &str) -> usize {
    let machine = Machine::from_str(raw).unwrap();
    machine.process()
}

fn part_two(raw: &str) -> usize {
    let machine = Machine::from_str(raw).unwrap();
    let result = 0;
    result
}

#[cfg(test)]
mod tests {
    use crate::{part_one, part_two};

    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 19114);
    }

    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input), 386787);
    }

    #[test]
    fn part_two_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_two(input), 167409079868000);
    }
}
