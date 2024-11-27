pub mod day04;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use crate::day04::day04::Day04;

    #[test]
    fn part_1() {
        let input = String::from(
            "aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa",
        );
        let puzz = Day04::new(&input);
        assert_eq!(puzz.part_one(), "2")
    }

    #[test]
    fn part_2() {
        let input = String::from(
            "abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio",
        );
        let puzz = Day04::new(&input);
        assert_eq!(puzz.part_two(), Some(String::from("3")));
    }
}
