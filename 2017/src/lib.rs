use colorized::{Color, Colors};
use common::{PuzzleParts, YearPuzzle};
use day01::day01::Day01;
use day02::day02::Day02;
use day03::day03::Day03;
use day04::day04::Day04;
use day05::day05::Day05;
use day06::day06::Day06;
use day07::day07::Day07;
use day08::day08::Day08;
use day09::day09::Day09;
use day10::day10::Day10;

mod day01;
mod day02;
mod day03;
mod day04;
mod day05;
mod day06;
mod day07;
mod day08;
mod day09;
mod day10;

#[allow(dead_code)]
pub enum Year2017{
    Day01(Day01),
    Day02(Day02),
    Day03(Day03),
    Day04(Day04),
    Day05(Day05),
    Day06(Day06),
    Day07(Day07),
    Day08(Day08),
    Day09(Day09),
    Day10(Day10),
}

impl YearPuzzle for Year2017 {
    fn new(day: &String, input: &String) -> Self {
        match day.as_str() {
            "1" => Year2017::Day01(Day01::new(input)),
            "2" => Year2017::Day02(Day02::new(input)),
            "3" => Year2017::Day03(Day03::new(input)),
            "4" => Year2017::Day04(Day04::new(input)),
            "5" => Year2017::Day05(Day05::new(input)),
            "6" => Year2017::Day06(Day06::new(input)),
            "7" => Year2017::Day07(Day07::new(input)),
            "8" => Year2017::Day08(Day08::new(input)),
            "9" => Year2017::Day09(Day09::new(input)),
            "10" => Year2017::Day10(Day10::new(input)),
            _ => {
                println!(
                    " -- invalid day value was passed - {}",
                    day.color(Colors::RedFg)
                );
                std::process::exit(1);
            }
        }
    }
    fn part_one(&mut self) -> String {
       match self{
           Year2017::Day01(p)=> p.part_one(),
           Year2017::Day02(p)=> p.part_one(),
           Year2017::Day03(p)=> p.part_one(),
           Year2017::Day04(p)=> p.part_one(),
           Year2017::Day05(p)=> p.part_one(),
           Year2017::Day06(p)=> p.part_one(),
           Year2017::Day07(p)=> p.part_one(),
           Year2017::Day08(p)=> p.part_one(),
           Year2017::Day09(p)=> p.part_one(),
           Year2017::Day10(p)=> p.part_one(),
       } 
    }
    fn part_two(&mut self) -> Option<String> {
       match self{
           Year2017::Day01(p)=> p.part_two(),
           Year2017::Day02(p)=> p.part_two(),
           Year2017::Day03(p)=> p.part_two(),
           Year2017::Day04(p)=> p.part_two(),
           Year2017::Day05(p)=> p.part_two(),
           Year2017::Day06(p)=> p.part_two(),
           Year2017::Day07(p)=> p.part_two(),
           Year2017::Day08(p)=> p.part_two(),
           Year2017::Day09(p)=> p.part_two(),
           Year2017::Day10(p)=> p.part_two(),
       } 
    }
}
