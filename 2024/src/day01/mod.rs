pub mod day01;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use crate::day01::day01::Day01;

    #[test]
    fn part_1() {
        let input = String::from(
            "3   4
4   3
2   5
1   3
3   9
3   3",
        );
        let mut puzz = Day01::new(&input);
        assert_eq!(puzz.part_one(), "11");
    }

    #[test]
    fn part_2() {
        let input = String::from(
            "3   4
4   3
2   5
1   3
3   9
3   3",
        );
        let mut puzz = Day01::new(&input);
        assert_eq!(puzz.part_two(), Some(String::from("31")));
    }
}
