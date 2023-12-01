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
    let mut result = 0;
    let lines = raw.lines();
    for line in lines {
        let digits = line
            .split("")
            .filter(|s| s.parse::<usize>().ok().is_some())
            .collect::<Vec<&str>>();
        let (first, last) = (digits.first().unwrap(), digits.last().unwrap());
        let new_str = format!("{first}{last}");
        let val = new_str.parse::<usize>().unwrap();
        result += val;
    }
    result
}

fn parse_line(line: &str, reverse: bool) -> String {
    let digits = vec![
        "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    ];
    let result = String::from("0");
    let mut strs = vec![];
    for letter in line.split("") {
        if letter.parse::<usize>().is_ok() {
            return letter.to_string();
        }
        if reverse {
            strs.insert(0, letter);
        } else {
            strs.push(letter);
        }
        for  test_digit in digits.iter() {
            if strs.join("").contains(test_digit) {
                return digits.clone().iter().position(|w| w==test_digit).unwrap().to_string();
            }
        }
    }
    result
}

fn part_two(raw: &str) -> usize {
    let mut result = 0;
    let lines = raw.lines();
    for line in lines {
        let mut digits: Vec<String> = vec![];
        digits.push(parse_line(line, false));
        let reversed = &line.clone().rsplit("").collect::<Vec<&str>>().join("");
        digits.push(parse_line(reversed, true));
        let new_str = format!("{}{}", digits.first().unwrap(), digits.last().unwrap());
        let val = new_str.parse::<usize>().unwrap();
        result += val;
    }
    result
}
