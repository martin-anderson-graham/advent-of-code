pub mod day14;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use super::day14::Day14;

    #[test]
    fn part_1() {
        let input = String::from(
            "p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3",
        );
        let mut puzz = Day14::new(&input);
        puzz.update_grid(11, 7);
        assert_eq!(puzz.part_one(), "12");
    }
}
