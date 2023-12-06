mod race;
use race::race::Race;

fn main() {
    println!("Hello, world!");
}

fn part_one(races: Vec<Race>) -> usize {
    races.iter().map(|r| r.get_count()).product()
}

#[cfg(test)]
mod tests {
    use crate::{part_one, race::race::Race};

    const EX_1: [Race; 3] = [
        Race {
            time: 7,
            record_distance: 9,
        },
        Race {
            time: 15,
            record_distance: 40,
        },
        Race {
            time: 30,
            record_distance: 200,
        },
    ];

    // removed for commit
    const INPUT: [Race; 0] = [];

    #[test]
    fn part_one_ex() {
        let result = part_one(EX_1.to_vec());
        assert_eq!(result, 288);
    }

    #[test]
    fn part_one_input() {
        let result = part_one(INPUT.to_vec());
        assert_eq!(result, 861300);
    }

    #[test]
    fn part_two_ex() {
        let result = Race {
            time: 71530,
            record_distance: 940200,
        };
        assert_eq!(result.get_count(), 71503);
    }

    #[test]
    fn part_two_input() {
        // removed for commit
        let result = Race {
            time: 0,
            record_distance: 0,
        };
        assert_eq!(result.get_count(), 28101347);
    }
}
