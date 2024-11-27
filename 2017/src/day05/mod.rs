pub mod day05;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use super::day05::Day05;

    #[test]
    fn part_1() {
        let input = String::from("0\n3\n0\n1\n-3\n");
        let mut puzz = Day05::new(&input);
        assert_eq!(puzz.part_one(), String::from("5"));
    }

    #[test]
    fn part_2() {
        let input = String::from("0\n3\n0\n1\n-3\n");
        let mut puzz = Day05::new(&input);
        assert_eq!(puzz.part_two(), Some(String::from("10")));
    }
}
