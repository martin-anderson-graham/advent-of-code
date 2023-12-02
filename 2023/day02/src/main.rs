mod game;
use game::game::Game;
use std::str::FromStr;

fn main() {}

pub fn part_one(raw: &str) -> usize {
    let games = raw.lines().map(|line| Game::from_str(line).unwrap());
    let mut total_score = 0;
    for mut game in games {
        game.run_rounds();
        if game.is_valid_game_part_one() {
            total_score += game.id;
        }
    }
    total_score
}

pub fn part_two(raw: &str) -> usize {
    let games = raw.lines().map(|line| Game::from_str(line).unwrap());
    let mut total_score = 0;
    for mut game in games {
        game.run_rounds();
        total_score += game.get_min_power();
    }
    total_score
}

#[cfg(test)]
mod tests {
    use crate::part_one;
    use crate::part_two;
    #[test]
    fn part_one_ex1() {
        let ex1 = include_str!("ex1.txt");
        assert_eq!(part_one(ex1), 8);
    }
    #[test]
    fn part_one_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_one(input), 2176);
    }
    #[test]
    fn part_two_ex1() {
        let input = include_str!("ex1.txt");
        assert_eq!(part_two(input), 2286);
    }
    #[test]
    fn part_two_input() {
        let input = include_str!("input.txt");
        assert_eq!(part_two(input), 63700);
    }
}
