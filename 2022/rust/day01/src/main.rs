use std::fs;

fn main() {
    // File hosts.txt must exist in the current path
    let raw1 = load_raw("src/ex1.txt");
    let mut new1 = parse(&raw1);
    new1.sort();
    let mut answer1: u32 = 0;
    if let Some(val) = new1.last() {
        answer1 = *val;
    }
    assert_eq!(answer1, 24000, "Asserting {} is {}", answer1, 24000);
    let raw2 = load_raw("src/input.txt");
    let mut new2 = parse(&raw2);
    new2.sort();
    let mut answer2: u32 = 0;
    if let Some(val) = new2.last() {
        answer2 = *val;
    }
    let expected2 = 71934;
    assert_eq!(answer2, expected2, "Asserting {} is {}", answer2, expected2);

    new2.reverse();
    let mut answer3: u32 = 0;
    if new2.len() >= 2 {
        answer3 = new2[0] + new2[1] + new2[2];
    }
    let expected3 = 211447;
    assert_eq!(answer3, expected3, "Asserting {} is {}", answer3, expected3);

}

pub fn load_raw(file: &str) -> String {
    fs::read_to_string(file).unwrap_or_else(|_| panic!("Error reading file {}", file))
}

fn parse(raw: &str) -> Vec<u32> {
    let binding = raw.replace('\r', "");
    let arr = binding.split("\n\n");
    let mut result: Vec<u32> = vec![];
    for group in arr {
        let mut sum: u32 = 0;
        for line in group.lines() {
            let parsed = line.parse::<u32>();
            if let Ok(val) = parsed {
                sum += val;
            }
        }
        result.push(sum)
    }
    result
}





   
