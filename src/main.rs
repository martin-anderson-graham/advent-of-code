use clap::{Parser, Subcommand};

#[macro_use]
extern crate dotenvy_macro;

#[derive(Parser)]
#[command(version, about, long_about=None)]
struct Args {
    #[arg(long, short)]
    day: Option<String>,

    #[arg(long, short, default_value=dotenv!("YEAR"))]
    year: String,

    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    Test {
        #[arg(short, long)]
        list: bool,
    },
}

fn main() {
    let args = Args::parse();
    let year = args.year;
    let day = match args.day {
        Some(ref _day) => _day,
        // TODO: get the most recent day of the year
        None => panic!("Please provide a --day"),
    };
}
