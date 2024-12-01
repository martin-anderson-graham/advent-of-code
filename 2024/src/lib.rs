use colorized::{Color, Colors};
use common::PuzzleParts;
use day01::day01::Day01;

mod day01;

pub struct Year2024;

impl Year2024 {
    pub fn new(day: &String, input: &String) -> Box<dyn PuzzleParts + 'static> {
        match day.as_str() {
            "1" => Box::new(Day01::new(input)),
            // "2" =>Box::new(Day02::new(input)),
            // "3" =>Box::new(Day03::new(input)),
            // "4" =>Box::new(Day04::new(input)),
            // "5" =>Box::new(Day05::new(input)),
            // "6" =>Box::new(Day06::new(input)),
            // "7" =>Box::new(Day07::new(input)),
            // "8" =>Box::new(Day08::new(input)),
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
