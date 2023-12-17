use std::str::FromStr;

use board::board::Board;

mod board;

fn main() {
    // let input = include_str!("ex1.txt");
    // let board = Board::from_str(input).unwrap();
    // board.score(true);
}

fn part_one(raw: &str) -> usize {
    let board = Board::from_str(raw).unwrap();
    board.score(true)
}

#[cfg(test)]
mod tests {
    use crate::part_one;

    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 8);
    }

    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input), 6815);
    }
}
