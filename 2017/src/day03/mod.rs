pub mod day03;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use crate::day03::day03::Day03;

    #[test]
    fn part_1(){
        let str_1 = String::from("1");
        let puzz_1 = Day03::new(&str_1);
        assert_eq!(puzz_1.part_one(), "0", "input {}", str_1);

        let str_2 = String::from("12");
        let puzz_2 = Day03::new(&str_2);
        assert_eq!(puzz_2.part_one(), "3", "input {}", str_2);

        let str_3 = String::from("23");
        let puzz_3 = Day03::new(&str_3);
        assert_eq!(puzz_3.part_one(), "2", "input {}", str_3);

        let str_4 = String::from("1024");
        let puzz_4 = Day03::new(&str_4);
        assert_eq!(puzz_4.part_one(), "31", "input {}", str_4);
    }

    #[test]
    fn part_2(){
        let input = String::from("747");
        let puzz = Day03::new(&input);
        assert_eq!(puzz.part_two().unwrap(), "806", "input {}", input);
    }
}
