pub mod day07;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use super::day07::Day07;

    #[test]
    fn part_1() {
        let input = String::from(
            "pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)",
        );
        let mut puzz = Day07::new(&input);
        println!("{}", puzz);
        assert_eq!(puzz.part_one(), String::from("tknk"));
    }

    #[test]
    fn part_2() {
        let input = String::from(
            "pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)",
        );
        let mut puzz = Day07::new(&input);
        assert_eq!(puzz.part_two(), Some(String::from("60")));
    }
}
