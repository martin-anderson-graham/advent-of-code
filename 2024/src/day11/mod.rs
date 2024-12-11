pub mod day11;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use crate::day11::day11::Day11;

    #[test]
    fn part_1() {
        let input = String::from("125 17");
        let mut puzz = Day11::new(&input);
        assert_eq!(puzz.part_one(), "55312");
    }
}
