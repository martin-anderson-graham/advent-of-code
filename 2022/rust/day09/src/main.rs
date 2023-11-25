mod puzzle;
mod rope;
use puzzle::puzzle::Puzzle;



fn main() {
    let ex1 = include_str!("./ex1.txt");
    let ex2 = include_str!("./ex2.txt");
    let input = include_str!("./input.txt");
    assert_eq!(part_one(ex1), 13);
    assert_eq!(part_one(input), 6284);

    assert_eq!(part_two(ex1), 1);
    assert_eq!(part_two(ex2), 36);
    assert_eq!(part_two(input), 2661);
}

fn part_one(raw: &str) -> usize {
    let mut puzzle = Puzzle::new(raw, 2);
    puzzle.run_simulation();
    puzzle.get_score()
}

fn part_two(raw: &str) -> usize {
    let mut puzzle = Puzzle::new(raw, 10);
    puzzle.run_simulation();
    puzzle.get_score()
}
