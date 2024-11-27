pub mod day01;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use crate::day01::day01::Day01;

    #[test]
    fn part_1(){
        let test_0 = String::from("1122");
        let mut p_0 = Day01::new(&test_0);
        assert_eq!(p_0.part_one(), "3");
        let test_1 = String::from("1111");
        let mut p_1 = Day01::new(&test_1);
        assert_eq!(p_1.part_one(), "4");
        let test_2 = String::from("91212129");
        let mut p_2 = Day01::new(&test_2);
        assert_eq!(p_2.part_one(), "9");
    }

    #[test]
    fn part_2(){
        let test_0 = String::from("1212");
        let  mut p_0 = Day01::new(&test_0);
        assert_eq!(p_0.part_two(), Some("6".to_string()));
        let test_1 = String::from("123425");
        let  mut p_1 = Day01::new(&test_1);
        assert_eq!(p_1.part_two(), Some(String::from("4")));
        let test_2 = String::from("123123");
        let mut  p_2 = Day01::new(&test_2);
        assert_eq!(p_2.part_two(), Some(String::from("12")));
    }
}
