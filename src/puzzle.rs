use colorized::{Color, Colors};
use sqlx::{Pool, Sqlite};

use crate::{cli::PuzzleArgs, data_store::PuzzleInputRow};

// TODO: input part 1 or 2?
pub struct PuzzleExecutor {
    input: String,
    day: String,
    year: String,
    pool: Pool<Sqlite>,
}

impl PuzzleExecutor {
    pub async fn new(puzzle_args: PuzzleArgs, pool: Pool<Sqlite>) -> Self {
        let mut executor = PuzzleExecutor {
            input: String::from(""),
            day: puzzle_args.day,
            year: puzzle_args.year,
            pool,
        };
        executor.get_puzzle_input_body().await;
        executor
    }

    async fn get_puzzle_input_body(&mut self) {
        // load from local db or server
        let input_row = match PuzzleInputRow::get(&self.day, &self.year, &self.pool).await {
            Ok(row) => row,
            _ => {
                println!(
                    " -- didn't find input, {}",
                    "fetching".color(Colors::YellowFg)
                );
                // TODO:
                println!(
                    "{}",
                    " -- implement fetching here"
                        .color(Colors::BlackFg)
                        .color(Colors::RedBg)
                );
                std::process::exit(1);
            }
        };

        self.input = input_row.body;
    }

    pub fn run(self) {
        // TODO
        // self.start_timing()
        // TODO:
        // self.end_timing()
        // TODO:
        // self.print_timing()
    }

    pub fn submit(self) {
        // TODO
        // check db for existing solution
        // check db for pending timeout
        // submit result
        // parse response
        // store respose
    }
}
