pub mod day02;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use crate::day02::day02::Day02;

    #[test]
    fn part_1(){
        let input = String::from("5 1 9 5
7 5 3
2 4 6 8");
        let puzz = Day02::new(&input);
        assert_eq!(puzz.part_one(), "18");
    }

    #[test]
    fn part_2(){
        let input = String::from("5 9 2 8
9 4 7 3
3 8 6 5");
        let puzz = Day02::new(&input);
        assert_eq!(puzz.part_two(), Some("9".to_string()));
    }
}
