use clap::Parser;
use colorized::{Color, Colors};

#[derive(Parser, Debug)]
#[command(version, about, long_about=None)]
struct Args {
    #[arg(long, short)]
    day: Option<String>,

    #[arg(long, short, default_value=dotenv!("DEFAULT_YEAR"))]
    year: String,
}

#[derive(Debug, PartialEq, PartialOrd)]
pub struct PuzzleArgs {
    pub day: String,
    pub year: String,
}
// parse the cli args
pub fn get_cli_args() -> PuzzleArgs {
    let args = Args::parse();
    let day = match args.day {
        Some(_day) => _day,
        // TODO: get the most recent day of the year
        None => {
            println!(
                " -- {} {} {} {} {}",
                "failed".color(Colors::RedFg),
                "please provide a",
                "day".color(Colors::GreenFg),
                "argument.",
                "exiting".color(Colors::BlueFg)
            );
            std::process::exit(1);
        }
    };

    println!(
        " -- loading {}/{}",
        args.year.color(Colors::BlueFg),
        day.color(Colors::YellowFg)
    );
    return PuzzleArgs {
        day,
        year: args.year,
    };
}
