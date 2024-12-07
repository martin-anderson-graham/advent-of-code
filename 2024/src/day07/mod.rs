pub mod day07;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use crate::day07::day07::Day07;

    #[test]
    fn part_1() {
        let input = String::from(
            "190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20",
        );
        let mut puzz = Day07::new(&input);
        assert_eq!(puzz.part_one(), "3749");
    }

    #[test]
    fn part_2() {
        let input = String::from(
            "190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20",
        );
        let mut puzz = Day07::new(&input);
        assert_eq!(puzz.part_two(), Some(String::from("11387")));
    }
}
