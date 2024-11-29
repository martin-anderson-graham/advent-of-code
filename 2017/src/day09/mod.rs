pub mod day09;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use super::day09::Day09;

    #[test]
    fn garbage_clean() {
        let str_1 = String::from("<>");
        let mut puzz_1 = Day09::new(&str_1);
        puzz_1.remove_garbage();
        assert_eq!(puzz_1.cleaned_input, "");

        let str_2 = String::from("<random characters>");
        let mut puzz_2 = Day09::new(&str_2);
        puzz_2.remove_garbage();
        assert_eq!(puzz_2.cleaned_input, "");

        let str_3 = String::from("<<<<>");
        let mut puzz_3 = Day09::new(&str_3);
        puzz_3.remove_garbage();
        assert_eq!(puzz_3.cleaned_input, "");

        let str_4 = String::from("<{!>}>");
        let mut puzz_4 = Day09::new(&str_4);
        puzz_4.remove_garbage();
        assert_eq!(puzz_4.cleaned_input, "");

        let str_5 = String::from("<!!>");
        let mut puzz_5 = Day09::new(&str_5);
        puzz_5.remove_garbage();
        assert_eq!(puzz_5.cleaned_input, "");

        let str_6 = String::from("<!!!>>");
        let mut puzz_6 = Day09::new(&str_6);
        puzz_6.remove_garbage();
        assert_eq!(puzz_6.cleaned_input, "");

        let str_7 = String::from("<{o\"i!a,<{i<a>");
        let mut puzz_7 = Day09::new(&str_7);
        puzz_7.remove_garbage();
        assert_eq!(puzz_7.cleaned_input, "");
    }

    #[test]
    fn test_score() {
        let mut input = String::from("{}");
        let mut puzz = Day09::new(&input);
        assert_eq!(puzz.part_one(), "1");

        input = String::from("{{{}}}");
        puzz = Day09::new(&input);
        assert_eq!(puzz.part_one(), "6");

        input = String::from("{{},{}}");
        puzz = Day09::new(&input);
        assert_eq!(puzz.part_one(), "5");

        input = String::from("{{{},{},{{}}}}");
        puzz = Day09::new(&input);
        assert_eq!(puzz.part_one(), "16");

        input = String::from("{<a>,<a>,<a>,<a>}");
        puzz = Day09::new(&input);
        assert_eq!(puzz.part_one(), "1");

        input = String::from("{{<ab>},{<ab>},{<ab>},{<ab>}}");
        puzz = Day09::new(&input);
        assert_eq!(puzz.part_one(), "9");

        input = String::from("{{<!!>},{<!!>},{<!!>},{<!!>}}");
        puzz = Day09::new(&input);
        assert_eq!(puzz.part_one(), "9");

        input = String::from("{{<a!>},{<a!>},{<a!>},{<ab>}}");
        puzz = Day09::new(&input);
        assert_eq!(puzz.part_one(), "3");
    }

    #[test]
    fn part_2() {
        let str_1 = String::from("<>");
        let mut puzz_1 = Day09::new(&str_1);
        assert_eq!(puzz_1.part_two(), Some(String::from("0")));

        let str_2 = String::from("<random characters>");
        let mut puzz_2 = Day09::new(&str_2);
        assert_eq!(puzz_2.part_two(), Some(String::from("17")));

        let str_3 = String::from("<<<<>");
        let mut puzz_3 = Day09::new(&str_3);
        assert_eq!(puzz_3.part_two(), Some(String::from("3")));

        let str_4 = String::from("<{!>}>");
        let mut puzz_4 = Day09::new(&str_4);
        assert_eq!(puzz_4.part_two(), Some(String::from("2")));

        let str_5 = String::from("<!!>");
        let mut puzz_5 = Day09::new(&str_5);
        assert_eq!(puzz_5.part_two(), Some(String::from("0")));

        let str_6 = String::from("<!!!>>");
        let mut puzz_6 = Day09::new(&str_6);
        assert_eq!(puzz_6.part_two(), Some(String::from("0")));

        let str_7 = String::from("<{o\"i!a,<{i<a>");
        let mut puzz_7 = Day09::new(&str_7);
        assert_eq!(puzz_7.part_two(), Some(String::from("10")));
    }
}
