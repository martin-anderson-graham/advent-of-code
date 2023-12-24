use std::str::FromStr;

use hall::hall::Hall;

mod hall;
fn main() {
    println!("Hello, world!");
}

fn part_one(raw: &str) -> usize {
    let mut hall = Hall::from_str(raw).unwrap();
    hall.process()
}

fn part_two(raw: &str) -> usize {
    let mut hall = Hall::from_str(raw).unwrap();
    hall.search_all()
}

#[cfg(test)]
mod tests {
    use crate::{part_one, part_two};

    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 46);
    }

    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input), 7242);
    }

    #[test]
    fn part_two_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_two(input), 51);
    }

    #[test]
    fn part_two_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_two(input), 7572);
    }
}
