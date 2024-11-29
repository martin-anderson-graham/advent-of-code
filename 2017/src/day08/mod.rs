pub mod day08;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use crate::day08::day08::Day08;

    #[test]
    fn part_1() {
        let input = String::from(
            "b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10",
        );
        let mut puzz = Day08::new(&input);
        assert_eq!(puzz.part_one(), "1");
    }

    #[test]
    fn part_2() {
        let input = String::from(
            "b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10",
        );
        let mut puzz = Day08::new(&input);
        assert_eq!(puzz.part_two(), Some(String::from("10")));
    }
}
