pub mod day01;

#[cfg(test)]
mod tests {
    use crate::day01::day01::{part_one, part_two};

    #[test]
    fn part_1(){
        let test_0 = String::from("1122");
        assert_eq!(part_one(&test_0), 3);
        let test_1 = String::from("1111");
        assert_eq!(part_one(&test_1), 4);
        let test_2 = String::from("91212129");
        assert_eq!(part_one(&test_2), 9);
    }

    #[test]
    fn part_2(){
        let test_0 = String::from("1212");
        assert_eq!(part_two(&test_0), 6);
        let test_1 = String::from("123425");
        assert_eq!(part_two(&test_1), 4);
        let test_2 = String::from("123123");
        assert_eq!(part_two(&test_2), 12);
    }
}
