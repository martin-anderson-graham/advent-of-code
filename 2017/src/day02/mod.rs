pub mod day02;

#[cfg(test)]
mod tests {
    use crate::day02::day02::{part_one, part_two};

    #[test]
    fn part_1(){
        let str = String::from("5 1 9 5
7 5 3
2 4 6 8");
        assert_eq!(part_one(&str), 18);
    }

    #[test]
    fn part_2(){
        let str = String::from("5 9 2 8
9 4 7 3
3 8 6 5");
        assert_eq!(part_two(&str), 9);
    }
}
