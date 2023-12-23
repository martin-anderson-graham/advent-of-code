use std::str::FromStr;

use hill::hill::Hill;

mod hill;
fn main() {
    let input = include_str!("ex1.txt");
    let mut hill = Hill::from_str(input).unwrap();
    for _ in 0..100 {
        hill.cycle();
    }
    hill.get_score();
}

fn part_one(raw: &str) -> usize {
    let mut hill = Hill::from_str(raw).unwrap();
    hill.roll_north();
    hill.get_score()
}

fn part_two(raw: &str) -> usize {
    let mut hill = Hill::from_str(raw).unwrap();
    let target = 1000000000;
    // let target = 100;
    let mut i: usize = 0;
    for _ in 0..target {
        i += 1;
        if hill.cycle().is_some() {
            break;
        };
    }

    // get cycle length
    let cycle_length = hill.get_cycle_length();
    // get reminder of cycle length after remaing loops (target - i ?)
    let remaining_cycles = target - i;
    let remainder = remaining_cycles % cycle_length + 1;
    // current self.counter holds the counter that began the new loop
    let mut current_counter = hill.counter;
    for _ in 0..remainder {
        let hit = hill.seen_counters.get(&current_counter).unwrap();
        current_counter = hit.0;
        hill.score = hit.1;
    }
    // for loop in range to follow the cycle the remainder number of times
    hill.score
}

#[cfg(test)]
mod tests {
    use crate::{part_one, part_two};

    #[test]
    fn part_one_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_one(input), 136);
    }

    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input), 113424);
    }

    #[test]
    fn part_two_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_two(input), 64);
    }

    #[test]
    fn part_two_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_two(input), 96003);
    }
}
