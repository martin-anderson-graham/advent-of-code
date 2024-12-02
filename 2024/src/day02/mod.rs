pub mod day02;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use crate::day02::day02::Day02;

    #[test]
    fn part_1() {
        let input = String::from(
            "7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9",
        );
        let mut puzzle = Day02::new(&input);
        assert_eq!(puzzle.part_one(), "2");
    }

    #[test]
    fn part_2() {
        let input = String::from(
            "7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9",
        );
        let mut puzzle = Day02::new(&input);
        assert_eq!(puzzle.part_two(), Some(String::from("4")));
    }
}
