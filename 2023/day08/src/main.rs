mod map;
use std::str::FromStr;

use map::map::Map;

fn main() {
    let input = include_str!("input.txt");
    assert_eq!(part_two(input), 6);
}

fn part_one(raw_str: &str) -> usize {
    let map = Map::from_str(raw_str).unwrap();
    map.score(true)
}

fn part_two(raw_str: &str) -> usize {
    let map = Map::from_str(raw_str).unwrap();
    map.score(false)
}

#[cfg(test)]
mod tests {
    use crate::{part_one, part_two};

    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 6);
    }

    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input), 14893);
    }

    #[test]
    fn part_two_ex1() {
        let input = include_str!("ex2.txt");
        assert_eq!(part_two(input), 6);
    }

    #[test]
    fn part_two_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_two(input), 10241191004509);
    }
}
