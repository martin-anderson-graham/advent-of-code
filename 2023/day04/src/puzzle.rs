pub mod puzzle {
    use itertools::Itertools;
    use std::{
        collections::{HashMap, HashSet},
        str::FromStr,
    };

    #[derive(Debug, PartialEq, Eq)]
    pub struct ParseGameError;

    #[derive(Debug)]
    struct Game {
        id: usize,
        winning_numbers: HashSet<usize>,
        played_numbers: HashSet<usize>,
    }

    impl FromStr for Game {
        type Err = ParseGameError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let (first_half, last_half) = s.split_once(": ").unwrap();
            let id = first_half
                .split_once(" ")
                .unwrap()
                .1
                .trim()
                .parse::<usize>()
                .unwrap();
            let (winning, played) = last_half
                .split(" | ")
                .take(2)
                .map(|side| {
                    side.split(" ")
                        .filter(|item| !item.eq(&"".to_string()))
                        .map(|item| item.parse::<usize>().unwrap())
                })
                .take(2)
                .collect_tuple()
                .unwrap();
            Ok(Game {
                id,
                winning_numbers: HashSet::from_iter(winning),
                played_numbers: HashSet::from_iter(played),
            })
        }
    }

    impl Game {
        fn score(&self) -> i32 {
            let card_count: u32 = self.get_winning_cards().iter().count().try_into().unwrap();
            if card_count == 0 {
                return 0;
            }
            let base: i32 = 2;
            base.pow(card_count - 1)
        }

        fn get_winning_cards(&self) -> Vec<String> {
            self.played_numbers
                .iter()
                .filter(|num| self.winning_numbers.get(num.clone()).is_some())
                .map(|val| val.to_string())
                .collect()
        }
    }

    #[derive(Debug, PartialEq, Eq)]
    pub struct ParsePuzzleError;

    pub struct Puzzle {
        games: Vec<Game>,
        card_counts: HashMap<usize, i32>,
    }

    impl FromStr for Puzzle {
        type Err = ParsePuzzleError;
        fn from_str(raw: &str) -> Result<Puzzle, Self::Err> {
            let mut result = Puzzle {
                games: raw
                    .lines()
                    .map(|l| Game::from_str(l).unwrap())
                    .collect::<_>(),
                card_counts: HashMap::new(),
            };
            for game in &result.games {
                result.card_counts.insert(game.id, 1);
            }
            Ok(result)
        }
    }

    impl Puzzle {
        pub fn score(&mut self, is_part_one: bool) -> i32 {
            if is_part_one {
                return self.games.iter().map(|game| game.score()).sum();
            }

            for game in &self.games {
                let num_winners = game.get_winning_cards().len();
                let copies_of_current_game = self.card_counts.get(&game.id).unwrap().clone();
                (game.id + 1..=game.id + num_winners).for_each(|i| {
                    *self.card_counts.entry(i).or_insert(1) += copies_of_current_game;
                });
            }
            println!("{:?}", self.card_counts);
            self.card_counts.values().sum()
        }
    }
}
