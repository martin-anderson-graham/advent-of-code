mod puzzle;
use puzzle::puzzle::Puzzle;

fn main() {}

fn part_one(raw: &str) -> usize {
    let mut puzz = Puzzle::new(raw);
    puzz.print_board();
    puzz.process_board();
    puzz.score(true)
}

fn part_two(raw: &str) -> usize {
    let mut puzz = Puzzle::new(raw);
    puzz.print_board();
    puzz.process_board();
    puzz.score(false)
}

#[cfg(test)]
mod tests {
    use crate::{part_one, part_two};
    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 4361);
    }
    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input), 531932);
    }

    #[test]
    fn part_two_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_two(input), 467835);
    }

    #[test]
    fn part_two_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_two(input), 73646890);
    }
}
