use std::fmt;

use colorized::{Color, Colors};
use common::PuzzleParts;
use sqlx::{Pool, Sqlite};
use year2017::Year2017;
use year2024::Year2024;

use crate::{cli::PuzzleArgs, data_store::PuzzleInputRow, http::AocHttpClient};

pub enum ValidYears {
    Year2024(String),
    Year2017(String),
}
impl fmt::Display for ValidYears {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            f,
            "{}",
            match self {
                ValidYears::Year2017(year) => year,
                ValidYears::Year2024(year) => year,
            }
        )
    }
}

impl ValidYears {
    fn get_from_string(year: &String) -> Self {
        match year.as_str() {
            "2024" => ValidYears::Year2024("2024".to_string()),
            "2017" => ValidYears::Year2017("2017".to_string()),
            val => {
                println!(
                    " -- {} is not a valid year, {}",
                    val,
                    "aborting".color(Colors::RedFg)
                );
                std::process::exit(1);
            }
        }
    }
}

struct Year<'a> {
    puzzle: Box<dyn PuzzleParts + 'a>,
}

impl Year<'_> {
    fn new(year: &ValidYears, day: &String, input: &String) -> Self {
        Self {
            puzzle: match year {
                ValidYears::Year2017(_) => Year2017::new(&day, &input),
                ValidYears::Year2024(_) => Year2024::new(&day, &input),
            },
        }
    }
}

pub struct PuzzleExecutor {
    input: String,
    day: String,
    year: ValidYears,
    pool: Pool<Sqlite>,
}

// TODO run multiple times for better test timing averages

impl PuzzleExecutor {
    pub async fn new(puzzle_args: PuzzleArgs, pool: Pool<Sqlite>) -> Self {
        let mut executor = PuzzleExecutor {
            input: String::from(""),
            day: puzzle_args.day,
            year: ValidYears::get_from_string(&puzzle_args.year),
            pool,
        };
        executor.get_puzzle_input_body().await;
        executor
    }

    async fn get_puzzle_input_body(&mut self) {
        // load from local db or server
        let (input_body, need_to_persist) =
            match PuzzleInputRow::get(&self.day, &self.year, &self.pool).await {
                Ok(row) => (row.body, false),
                _ => {
                    println!(
                        " -- didn't find input, {}",
                        "fetching".color(Colors::YellowFg)
                    );
                    (
                        AocHttpClient::fetch_puzzle_input(&self.day, &self.year).await,
                        true,
                    )
                }
            };
        if need_to_persist {
            PuzzleInputRow::upsert_puzzle_input(&self.day, &self.year, &input_body, &self.pool)
                .await;
        }
        self.input = input_body;
    }

    pub fn run(&self) {
        let mut year = Year::new(&self.year, &self.day, &self.input);
        let start_1 = std::time::Instant::now();
        let p_1 = year.puzzle.part_one();
        let elapsed_1 = start_1.elapsed();
        println!(" -- part one result is {}", p_1.color(Colors::YellowFg));
        println!(" -- Time to run part one is {:?}", elapsed_1);

        // we recreate it so clear out any state
        let mut year = Year::new(&self.year, &self.day, &self.input);
        let start_2 = std::time::Instant::now();
        let p_2 = year.puzzle.part_two();
        let elapsed_2 = start_2.elapsed();
        if let Some(res) = p_2 {
            println!(" -- part two result is {}", res.color(Colors::GreenFg));
            println!(" -- Time to run part two is {:?}", elapsed_2);
        }
    }

    pub fn submit(&self) {
        // TODO
        // check db for existing solution
        // check db for pending timeout
        // submit result
        // parse response
        // store respose
    }
}
