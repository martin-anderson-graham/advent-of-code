pub mod day10;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use super::day10::Day10;

    #[test]
    fn part_two() {
        let input = String::from("1,2,3");
        let mut puzz = Day10::new(&input);

        let result = puzz.part_two();
        // lengths_2
        assert_eq!(puzz.lengths_2, [49, 44, 50, 44, 51, 17, 31, 73, 47, 23]);
        assert_eq!(
            result,
            Some(String::from("3efbe78a8d82f29979031a4aa0b16a9d"))
        );
    }
}
