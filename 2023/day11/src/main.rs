use std::str::FromStr;

use cosmos::cosmos::Cosmos;

mod cosmos;

fn main() {
    println!("Hello, world!");
}

fn part_one(raw: &str) -> isize {
    let mut cosmos = Cosmos::from_str(raw).unwrap();
    cosmos.expand();
    // cosmos.print_grid();
    cosmos.score(1)
}

fn part_two(raw: &str, extra_rows: isize) -> isize {
    let mut cosmos = Cosmos::from_str(raw).unwrap();
    cosmos.expand();
    // cosmos.print_grid();
    cosmos.score(extra_rows)
}

#[cfg(test)]
mod tests {
    use crate::{part_one, part_two};

    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 374);
    }

    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input), 9233514);
    }

    #[test]
    fn part_two_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_two(input, 9), 1030);
    }

    #[test]
    fn part_two_ex1b() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_two(input, 99), 8410);
    }

    #[test]
    fn part_two_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_two(input, 999999), 363293506944);
    }
}
