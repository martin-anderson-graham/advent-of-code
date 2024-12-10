pub mod day09;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use crate::day09::day09::Day09;

    #[test]
    fn part_1() {
        let input = String::from("2333133121414131402");
        let mut puzz = Day09::new(&input);
        assert_eq!(puzz.part_one(), "1928");
    }

    #[test]
    fn part_2() {
        let input = String::from("2333133121414131402");
        let mut puzz = Day09::new(&input);
        assert_eq!(puzz.part_two(), Some(String::from("2858")));
    }
}
