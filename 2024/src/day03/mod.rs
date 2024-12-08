pub mod day03;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use crate::day03::day03::Day03;

    #[test]
    fn part_1() {
        let input =
            String::from("xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))");
        let mut puzz = Day03::new(&input);
        assert_eq!(puzz.part_one(), "161");
    }

    #[test]
    fn part_2() {
        let input = String::from(
            "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
        );
        let mut puzz = Day03::new(&input);
        assert_eq!(puzz.part_two(), Some(String::from("48")));
    }
}
