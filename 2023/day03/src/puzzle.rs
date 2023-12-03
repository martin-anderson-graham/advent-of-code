pub mod puzzle {
    use std::{collections::HashMap, str::FromStr};

    #[derive(Debug, PartialEq, Eq)]
    pub struct ParsePointError(String);

    #[derive(Debug, PartialEq)]
    enum Point {
        Dot(),
        Digit(usize),
        Symbol(),
        Gear(),
    }

    impl Point {
        fn get_str(&self) -> String {
            match self {
                Point::Dot() => ".".to_string(),
                Point::Digit(val) => val.to_string(),
                Point::Symbol() => "0".to_string(),
                Point::Gear() => "*".to_string(),
            }
        }
    }

    impl FromStr for Point {
        type Err = ParsePointError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            // if s.len() != 1 {
            //     return Err(ParsePointError("no length".to_string()));
            // }
            match s {
                "." => Ok(Point::Dot()),
                "*" => Ok(Point::Gear()),
                val => {
                    if let Ok(val) = val.parse::<usize>() {
                        return Ok(Point::Digit(val));
                    } else {
                        return Ok(Point::Symbol());
                    }
                }
            }
        }
    }

    #[derive(Debug)]
    struct Gear {
        numbers: Vec<usize>,
    }

    impl Gear {
        fn get_hashmap_key(x: usize, y: usize) -> String {
            String::from(format!("({x},{y})"))
        }
        fn new() -> Self {
            Gear { numbers: vec![] }
        }
    }

    pub struct Puzzle {
        board: Vec<Vec<Point>>,
        gears: HashMap<String, Gear>,
        part_one_total: usize,
    }

    impl Puzzle {
        pub fn new(raw: &str) -> Self {
            let board: Vec<Vec<Point>> = raw
                .lines()
                .map(|line| {
                    line.chars()
                        .map(|s| Point::from_str(&s.to_string()).unwrap())
                        .collect::<_>()
                })
                .collect::<_>();
            Puzzle {
                board,
                gears: HashMap::new(),
                part_one_total: 0,
            }
        }

        fn populate_gears(&mut self) {
            for (y, row) in self.board.iter().enumerate() {
                for (x, point) in row.iter().enumerate() {
                    match point {
                        Point::Gear() => {
                            let key = Gear::get_hashmap_key(x, y);
                            match self.gears.get_mut(&key) {
                                Some(_) => continue,
                                None => self.gears.insert(key, Gear::new()),
                            };
                        }
                        _ => continue,
                    }
                }
            }
        }

        fn add_number_to_gear(&mut self, current_num: usize, x: usize, y: usize) {
            let key = Gear::get_hashmap_key(x, y);
            match self.gears.get_mut(&key) {
                Some(gear) => gear.numbers.push(current_num),
                None => panic!("Trying to add to a gear which wasn't popluated"),
            }
        }

        fn handle_symbol_or_gear(
            &mut self,
            current_num: usize,
            start_x: usize,
            x: usize,
            y: usize,
        ) {
            if current_num != 0 {
                if self.check_number_is_valid(start_x, x, y, current_num) {
                    self.part_one_total += current_num;
                } else {
                    println!("{current_num}");
                }
            }
        }

        pub fn score(&self, is_part_one: bool) -> usize {
            if is_part_one {
                return self.part_one_total;
            }
            self.gears
                .values()
                .filter(|g| g.numbers.len() == 2)
                .map(|g| g.numbers.iter().product::<usize>())
                .sum()
        }

        pub fn process_board(&mut self) {
            self.populate_gears();
            println!("{:?}", self.gears);
            for y in 0..self.board.len() {
                let mut start_x = 0;
                let mut x: usize = 0;
                let mut current_num = 0;
                while x < self.board.get(y).unwrap().len() {
                    match self.board.get(y).unwrap().get(x).unwrap() {
                        Point::Digit(val) => {
                            current_num = current_num * 10 + val;
                        }
                        Point::Gear() => {
                            self.handle_symbol_or_gear(current_num, start_x, x, y);
                            current_num = 0;
                            start_x = x;
                        }
                        _ => {
                            self.handle_symbol_or_gear(current_num, start_x, x, y);
                            current_num = 0;
                            start_x = x;
                        }
                    };
                    x += 1;
                }
                // fencepost
                if current_num != 0 {
                    self.handle_symbol_or_gear(current_num, start_x, x, y);
                }
            }
        }

        fn check_number_is_valid(
            &mut self,
            start_x: usize,
            x: usize,
            row_index: usize,
            current_num: usize,
        ) -> bool {
            let y_start = if row_index > 0 { row_index - 1 } else { 0 };
            for y in y_start..=(row_index + 1) {
                let row = match &self.board.get(y) {
                    Some(val) => val,
                    None => continue,
                }
                .clone();
                for temp_x in start_x..=x {
                    match row.get(temp_x).unwrap_or(&Point::Dot()) {
                        Point::Symbol() => {
                            return true;
                        }
                        Point::Gear() => {
                            self.add_number_to_gear(current_num, temp_x, y);
                            return true;
                        }
                        _ => continue,
                    }
                }
            }
            println!("starts - {}, {}, {}", start_x, y_start, x);
            false
        }

        pub fn print_board(&self) {
            for row in &self.board {
                println!(
                    "{}",
                    row.iter()
                        .map(|p| p.get_str())
                        .collect::<Vec<String>>()
                        .join("")
                );
            }
        }
    }

    #[cfg(test)]
    mod point_tests {
        use std::str::FromStr;

        use crate::puzzle::puzzle::Point;

        #[test]
        fn point_from_str() {
            assert_eq!(Point::from_str("."), Ok(Point::Dot()));
            assert_eq!(Point::from_str("*"), Ok(Point::Gear()));
            assert_eq!(Point::from_str("&"), Ok(Point::Symbol()));
            assert_eq!(Point::from_str("7"), Ok(Point::Digit(7)));
        }
    }
}
