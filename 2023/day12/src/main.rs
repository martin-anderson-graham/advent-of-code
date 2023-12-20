use std::str::FromStr;

use puzzle::puzzle::Record;

mod puzzle;

fn main() {
    println!("Hello, world!");
}

fn part_one(raw: &str) -> usize {
    let mut records: Vec<Record> = raw.lines().map(|s| Record::from_str(s).unwrap()).collect();
    records.iter_mut().map(|r| r.get_num_iterations()).sum()
}

fn part_two(raw: &str) -> usize {
    let mut records: Vec<Record> = raw.lines().map(|s| Record::new(s).unwrap()).collect();
    records.iter_mut().map(|r| r.get_num_iterations()).sum()
}

#[cfg(test)]
mod tests {
    use crate::{part_one, part_two};

    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 21);
    }

    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input), 7307);
    }

    #[test]
    fn part_two_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_two(input), 525152);
    }

    #[test]
    fn part_two_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_two(input), 3415570893842);
    }
}
