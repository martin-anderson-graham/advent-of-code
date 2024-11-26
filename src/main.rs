use std::env;

use colorized::{Color, Colors};
mod cli;
mod http;
mod puzzle;
use dotenvy::dotenv;
use puzzle::PuzzleExecutor;
use sqlx::SqlitePool;
mod data_store;
use tokio;

#[macro_use]
extern crate dotenvy_macro;

#[tokio::main(flavor = "current_thread")]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv()?;

    println!();
    println!("{}", "Starting:".color(Colors::GreenFg));
    let puzzle_args = cli::get_cli_args();

    let pool = SqlitePool::connect(&env::var("DATABASE_URL").unwrap()).await?;

    let puzzle_executor = PuzzleExecutor::new(puzzle_args, pool).await;

    // TODO
    let start = std::time::Instant::now();
    puzzle_executor.run();
    let elapsed = start.elapsed();
    println!(" -- Time to run both parts is {:?}", elapsed);
    // TODO
    puzzle_executor.submit();

    println!();

    return Ok(());
}
