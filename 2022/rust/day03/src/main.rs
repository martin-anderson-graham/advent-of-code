use std::collections::HashSet;

fn get_ascii_code(char: char) -> u32 {
    match char.is_ascii_uppercase() {
        true => char as u32 - 'A' as u32 + 27,
        false => char as u32 - 'a' as u32 + 1,
    }
}

fn main() {
    let ex1 = include_str!("ex1.txt");
    let input = include_str!("input.txt");
    assert_eq!(part_one(ex1), 157);
    assert_eq!(part_one(input), 7917);
    assert_eq!(part_two(ex1), 70);
    assert_eq!(part_two(input), 2585);
}

fn get_char_hashset(str: &str) -> HashSet<u32> {
    str.chars()
        .map(|c| get_ascii_code(c))
        .collect::<HashSet<_>>()
}

fn part_one(str: &str) -> u32 {
    str.lines()
        .map(|line| {
            let subs: (&str, &str) = (&line[..&line.len() / 2], &line[&line.len() / 2..]);
            let first_set = get_char_hashset(subs.0);
            let second_set = get_char_hashset(subs.1);
            let mut result: u32 = 0;
            for val in first_set.intersection(&second_set) {
                result = *val;
            }
            result
        })
        .sum()
}

fn part_two(str: &str) -> u32 {
    let mut line = str.lines();
    let mut results = Vec::<u32>::new();
    loop {
        if let (Some(one), Some(two), Some(three)) = (line.next(), line.next(), line.next()) {
            let first = get_char_hashset(one);
            let second = get_char_hashset(two);
            let third = get_char_hashset(three);
            for val in first.intersection(&second) {
                if third.contains(val) {
                    results.push(*val)
                }
            }
        } else {
            break;
        }
    }
    results.iter().sum()
}
