use regex::Regex;

static DIGITS: [&str; 10] = [
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
];

fn get_index_value(digit_str: String) -> usize {
    match DIGITS.iter().position(|s| digit_str.eq(s)) {
        Some(val) => val,
        None => panic!("How did you find an invalid digit?"),
    }
}

fn get_number_from_text(digit_str: String) -> usize {
    if let Ok(val) = digit_str.parse::<usize>() {
        return val;
    } else {
        return get_index_value(digit_str);
    };
}

fn main() {
    let ex1 = include_str!("ex1.txt");
    let ex2 = include_str!("ex2.txt");
    let input = include_str!("input.txt");
    assert_eq!(part_one(ex1), 142);
    assert_eq!(part_one(input), 54667);
    assert_eq!(part_two(ex2), 281);
    assert_eq!(part_two(input), 54203);
}

fn part_one(raw: &str) -> usize {
    raw.lines().map(|line| parse_line(line, false)).sum()
}

fn parse_line(line: &str, is_part_two: bool) -> usize {
    let re_numbers = Regex::new(r"(\d)").unwrap();
    let re_numbers_and_words =
        Regex::new(r"(0|1|2|3|4|5|6|7|8|9|zero|one|two|three|four|five|six|seven|eight|nine)")
            .unwrap();

    let first: usize;
    let last: usize;
    if is_part_two {
        let caps: Vec<_> = re_numbers_and_words
            .find_iter(line)
            .map(|s| s.as_str())
            .collect();
        let (first_str, last_str) = (caps.first().unwrap(), caps.last().unwrap());
        first = get_number_from_text(first_str.to_string());
        last = get_number_from_text(last_str.to_string());
    } else {
        let caps: Vec<_> = re_numbers.find_iter(line).map(|s| s.as_str()).collect();
        let (first_str, last_str) = (caps.first().unwrap(), caps.last().unwrap());
        first = get_number_from_text(first_str.to_string());
        last = get_number_from_text(last_str.to_string());
    }

    first * 10 + last
}

fn part_two(raw: &str) -> usize {
    raw.lines().map(|line| parse_line(line, true)).sum()
}
