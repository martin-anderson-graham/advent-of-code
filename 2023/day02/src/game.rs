pub mod game {
    use std::str::FromStr;

    #[derive(Debug, PartialEq, Eq)]
    pub struct ParseGameError;

    #[derive(Debug, PartialEq, Eq)]
    pub struct ParseRoundError;

    struct Round {
        red: usize,
        green: usize,
        blue: usize,
    }

    impl FromStr  for Round {
        type Err = ParseRoundError;
        fn from_str(raw: &str) -> Result<Round, Self::Err> {
            let color_splits = raw.split(", ").map(|s| s.split(" "));
            let mut red = 0;
            let mut green = 0;
            let mut blue = 0;

            for mut color_split in color_splits {
                let num = color_split.next().unwrap().parse::<usize>().unwrap();
                match color_split.next().unwrap() {
                    "red" => red = num,
                    "green" => green = num,
                    "blue" => blue = num,
                    _ => panic!("Found a non-color where a color is expected"),
                };
            }

            Ok(Round {
                red,
                green,
                blue
            })
        }
    }

    pub struct Game {
        pub id: usize,
        rounds: Vec<Round>,
        max_red: usize,
        max_green: usize,
        max_blue: usize,
    }

    impl Game {
        fn new(id: usize, rounds: Vec<Round>) -> Game {
            Game {
                id,
                rounds,
                max_red: 0,
                max_blue: 0,
                max_green: 0,
            }
        }
        pub fn is_valid_game_part_one(&self) -> bool {
            self.max_red <= 12 && self.max_green <= 13 && self.max_blue <= 14
        }

        pub fn run_rounds(&mut self) {
            for round in self.rounds.iter() {
                if round.red > self.max_red {
                    self.max_red = round.red;
                }
                if round.green > self.max_green {
                    self.max_green = round.green;
                }
                if round.blue > self.max_blue {
                    self.max_blue = round.blue;
                }
            }
        }
        pub fn get_min_power(&self) -> usize {
            self.max_blue * self.max_green * self.max_red
        }
    }

    impl FromStr for Game {
        type Err = ParseGameError;
        fn from_str(raw: &str) -> Result<Game, Self::Err> {
            let mut colon_split_iter = raw.split(": ").into_iter();
            let (pre_colon, post_colon) = (
                colon_split_iter.next().unwrap(),
                colon_split_iter.next().unwrap(),
            );
            let game_id = pre_colon.split(" ").last().unwrap().parse::<usize>().unwrap();

            let rounds = post_colon.split("; ").map(|raw_round| Round::from_str(raw_round).unwrap()).collect();

            Ok(Game::new(game_id, rounds))
        }
    }
}
