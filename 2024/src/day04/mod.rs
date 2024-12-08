pub mod day04;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use crate::day04::day04::Day04;

    #[test]
    fn part_1() {
        let input = String::from(
            "MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX",
        );
        let mut puzz = Day04::new(&input);
        assert_eq!(puzz.part_one(), "18");
    }

    #[test]
    fn part_2() {
        let input = String::from(
            "MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX",
        );
        let mut puzz = Day04::new(&input);
        assert_eq!(puzz.part_two(), Some(String::from("9")));
    }
}
