mod game;

use game::game::Hand;

fn main() {
    println!("Hello, world!");
}

fn part_one(raw: &str) -> usize {
    let hands: Vec<Hand> = raw.lines().map(|l| Hand::new(l, true)).collect();
    Hand::score_hands(&hands, true)
}

fn part_two(raw: &str) -> usize {
    let hands: Vec<Hand> = raw.lines().map(|l| Hand::new(l, false)).collect();
    Hand::score_hands(&hands, false)
}

#[cfg(test)]
mod tests {
    use crate::{part_one, part_two};

    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 6440);
    }

    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input), 248836197);
    }

    #[test]
    fn part_two_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_two(input), 5905);
    }

    #[test]
    fn part_two_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_two(input), 251195607);
    }
}
