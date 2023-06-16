use std::fs;

#[derive(Debug)]
enum First {
    A,
    B,
    C,
}

#[derive(Debug)]
enum Second {
    X,
    Y,
    Z,
}

enum RoundResult {
    Win,
    Draw,
    Loss,
}

#[derive(Debug)]
struct Round {
    first: First,
    second: Second,
}

impl Round {
    fn score_round(&self) -> u32 {
        let sum =  match self.second {
            Second::X => 1,
            Second::Y => 2,
            Second::Z => 3,
        };
        let round_result: RoundResult = match (&self.first, &self.second) {
            (First::A, Second::X) => RoundResult::Draw,
            (First::A, Second::Y) => RoundResult::Win,
            (First::A, Second::Z) => RoundResult::Loss,
            (First::B, Second::X) => RoundResult::Loss,
            (First::B, Second::Y) => RoundResult::Draw,
            (First::B, Second::Z) => RoundResult::Win,
            (First::C, Second::X) => RoundResult::Win,
            (First::C, Second::Y) => RoundResult::Loss,
            (First::C, Second::Z) => RoundResult::Draw,
        };
        let result_score = match round_result {
            RoundResult::Win => 6,
            RoundResult::Draw => 3,
            RoundResult::Loss => 0,
        };

        sum + result_score
    }
}

fn main() {
    let raw1 = load_raw("ex1.txt");
    let rounds = parse(&raw1);
    let sum: u32 = rounds.iter().map(|r| r.score_round()).sum();
    assert_eq!(sum, 15);
    let raw2 = load_raw("input.txt");
    let rounds = parse(&raw2);
    let sum2: u32 = rounds.iter().map(|r| r.score_round()).sum();
    println!("{sum2}")
}

pub fn load_raw(file: &str) -> String {
    fs::read_to_string(file).unwrap_or_else(|_| panic!("Error reading file {}", file))
}

fn parse(raw: &str) -> Vec<Round> {
    let binding = raw.replace('\r', "");
    let arr: Vec<&str> = binding.split("\n").collect();
    let mut result: Vec<Round> = vec![];
    for line in arr {
        if line == "" {
            continue;
        }
        let mut iters = line.chars();
        let mut round = Round {
            first: First::A,
            second: Second::X,
        };
        if let Some(first) = iters.next() {
            if first == 'A' {
                round.first = First::A;
            } else if first == 'B' {
                round.first = First::B;
            } else if first == 'C' {
                round.first = First::C;
            }
        }

        iters.next();

        if let Some(second) = iters.next() {
            if second == 'X' {
                round.second = Second::X;
            } else if second == 'Y' {
                round.second = Second::Y;
            } else if second == 'Z' {
                round.second = Second::Z;
            }
        }

        result.push(round)
    };
    result
}
