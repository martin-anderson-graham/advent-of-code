use colorized::{Color, Colors};
use common::PuzzleParts;
use day01::day01::Day01;
use day02::day02::Day02;
use day03::day03::Day03;
use day04::day04::Day04;
use day05::day05::Day05;
use day06::day06::Day06;
use day07::day07::Day07;
use day08::day08::Day08;

mod day01;
mod day02;
mod day03;
mod day04;
mod day05;
mod day06;
mod day07;
mod day08;

pub struct Year2024;

impl Year2024 {
    pub fn new(day: &String, input: &String) -> Box<dyn PuzzleParts + 'static> {
        match day.as_str() {
            "1" => Box::new(Day01::new(input)),
            "2" => Box::new(Day02::new(input)),
            "3" => Box::new(Day03::new(input)),
            "4" => Box::new(Day04::new(input)),
            "5" => Box::new(Day05::new(input)),
            "6" => Box::new(Day06::new(input)),
            "7" => Box::new(Day07::new(input)),
            "8" => Box::new(Day08::new(input)),
            // "9" =>Box::new(Day09::new(input)),
            // "10" => Box::new(Day10::new(input))),
            _ => {
                println!(
                    " -- invalid day value was passed - {}",
                    day.color(Colors::RedFg)
                );
                std::process::exit(1);
            }
        }
    }
}
