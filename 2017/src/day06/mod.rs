pub mod day06;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use super::day06::Day06;

    #[test]
    fn part_1() {
        let input = String::from("0 2 7 0");
        let mut puzz = Day06::new(&input);
        assert_eq!(puzz.part_one(), String::from("5"));
    }
    #[test]
    fn part_2() {
        let input = String::from("0 2 7 0");
        let mut puzz = Day06::new(&input);
        assert_eq!(puzz.part_two(), Some(String::from("4")));
    }
}
