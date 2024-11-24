use colorized::{Color, Colors};
mod cli;

#[macro_use]
extern crate dotenvy_macro;

fn main() {
    println!();
    println!("{}", "Starting:".color(Colors::GreenFg));
    let puzzle_args = cli::get_cli_args();

    println!(
        " -- executing {}/{}",
        puzzle_args.year.color(Colors::BlueFg),
        puzzle_args.day.color(Colors::YellowFg)
    );
    println!();
}
