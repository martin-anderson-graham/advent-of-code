pub fn run(input: String) {
    let p_one = part_one(&input);
    println!(" -- part 1 - {}", p_one);
    let p_two = part_two(&input);
    println!(" -- part 2 - {}", p_two);
}

pub fn part_one(input: &String) -> usize {
    let nums = parse_input(input);
    let mut result: usize = 0;

    let mut first = 0;
    let mut second = 1;

    while first < nums.len() {
        if first == nums.len() - 1 {
            if nums[first] == nums[0] {
                result += nums[first];
            }
        } else {
            if nums[first] == nums[second] {
                result += nums[second];
            }
        }
        first += 1;
        second += 1;
    }
    result
}

pub fn part_two(input: &String) -> usize {
    let nums = parse_input(input);
    let nums_len = nums.len();
    let mut result: usize = 0;

    let mut first = 0;
    let halfway = nums_len / 2;
    let mut second = halfway;

    while first < nums_len {
        let second_val = nums[second];
        if nums[first] == second_val {
            result += nums[first];
        }
        first += 1;
        second = (first + halfway) % nums_len;
    }
    result
}

pub fn parse_input(input: &String) -> Vec<usize> {
    input
        .trim()
        .chars()
        .map(|s| s.to_string().parse::<usize>().unwrap())
        .collect()
}
