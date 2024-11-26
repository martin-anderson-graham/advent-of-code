pub mod day03;

#[cfg(test)]
mod tests {
    use crate::day03::day03::{part_one, part_two};

    #[test]
    fn part_1(){
        let str_1 = String::from("1");
        assert_eq!(part_one(&str_1), 0, "input {}", str_1);

        let str_2 = String::from("12");
        assert_eq!(part_one(&str_2), 3, "input {}", str_2);

        let str_3 = String::from("23");
        assert_eq!(part_one(&str_3), 2, "input {}", str_3);

        let str_4 = String::from("1024");
        assert_eq!(part_one(&str_4), 31, "input {}", str_4);
    }

    #[test]
    fn part_2(){
        let str_4 = String::from("747");
        assert_eq!(part_two(&str_4), 806, "input {}", str_4);
    }
}
