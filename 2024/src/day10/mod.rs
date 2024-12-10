pub mod day10;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use crate::day10::day10::Day10;

    #[test]
    fn part_1a() {
        let input = String::from(
            "0123
1234
8765
9876",
        );

        let mut puzz = Day10::new(&input);
        assert_eq!(puzz.part_one(), "1");
    }
    #[test]
    fn part_1b() {
        let input = String::from(
            "89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732",
        );

        let mut puzz = Day10::new(&input);
        assert_eq!(puzz.part_one(), "36");
    }

    #[test]
    fn part_2() {
        let input = String::from(
            "89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732",
        );

        let mut puzz = Day10::new(&input);
        assert_eq!(puzz.part_two(), Some(String::from("81")));
    }
}
