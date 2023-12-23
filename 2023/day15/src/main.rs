use hash::hash::HashList;

mod hash;

fn main() {
    println!("Hello, world!");
}

const EX1: &str = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";

fn part_one(raw: &str) -> u32 {
    let mut hash = HashList::new(raw);
    hash.process(false);
    hash.get_score(false)
}

fn part_two(raw: &str) -> u32 {
    let mut hash = HashList::new(raw);
    hash.process(true);
    for box_ in &hash.boxes {
        if !box_.is_empty() {
            println!("{:?}", box_);
        }
    }
    hash.get_score(true)
}

#[cfg(test)]
mod test {
    use crate::{part_one, part_two, EX1};

    #[test]
    fn part_one_ex0() {
        let input = "HASH";
        assert_eq!(part_one(input), 52);
    }

    #[test]
    fn part_one_ex1() {
        let input = EX1;
        assert_eq!(part_one(input), 1320);
    }

    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt").trim();
        assert_eq!(part_one(input), 514281);
    }

    #[test]
    fn part_two_ex1() {
        let input = EX1;
        assert_eq!(part_two(input), 145);
    }

    #[test]
    fn part_two_input() {
        let input = include_str!("input.txt").trim();
        assert_eq!(part_two(input), 244199);
    }
}
