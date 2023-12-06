mod puzzle;

use crate::puzzle::puzzle::Puzzle;

fn main() {
    println!("Hello, world!");
}

fn part_one(raw: &str) -> usize {
    let puzzle = Puzzle::new(raw, true);
    puzzle.score(true)
}


fn part_two(raw: &str) -> usize {
    let puzzle = Puzzle::new(raw, false);
    puzzle.score(false)
}

#[cfg(test)]
mod tests {
    use crate::{part_one, part_two};

    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 35);
    }
    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input), 662197086);
    }
    #[test]
    fn part_two_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_two(input), 46);
    }

    #[test]
    fn part_two_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_two(input), 52510809);
    }
}

