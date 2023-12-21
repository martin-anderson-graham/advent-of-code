use std::str::FromStr;

use mirror::mirror::Pattern;

mod mirror;
fn main() {
    println!("Hello, world!");
}

fn part_one(raw: &str) -> usize {
    let mut puzzle = raw
        .split("\n\n")
        .map(|l| Pattern::from_str(l).unwrap())
        .collect::<Vec<_>>();
    puzzle.iter_mut().for_each(|p| p.process(None, None));
    puzzle.iter().map(|p| p.score()).sum()
}

fn part_two(raw: &str) -> usize {
    let mut puzzle = raw
        .split("\n\n")
        .map(|l| Pattern::from_str(l).unwrap())
        .collect::<Vec<_>>();
    puzzle.iter_mut().for_each(|p| p.process_2());
    puzzle.iter().map(|p| p.score()).sum()
}

#[cfg(test)]
mod test {
    use crate::{part_one, part_two};

    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 405);
    }

    #[test]
    fn part_one_ex2() {
        let input = include_str!("ex2.txt");
        assert_eq!(part_one(input), 4);
    }

    #[test]
    fn part_one_ex3() {
        let input = include_str!("ex3.txt");
        assert_eq!(part_one(input), 1400);
    }

    #[test]
    fn part_one_ex4() {
        let input = include_str!("ex4.txt");
        assert_eq!(part_one(input), 100);
    }

    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input), 37381);
    }

    #[test]
    fn part_two_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_two(input), 400);
    }

    #[test]
    fn part_two_ex5() {
        let input = include_str!("ex5.txt");
        assert_eq!(part_two(input), 100);
    }

    #[test]
    fn part_two_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_two(input), 28210);
        // 17297 too low
    }
}
