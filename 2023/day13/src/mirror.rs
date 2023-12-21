pub mod mirror {
    use core::fmt;
    use std::str::FromStr;

    use itertools::Itertools;

    #[derive(Debug)]
    struct ParsePointError;

    #[derive(Debug)]
    pub struct ParsePatternError;

    #[derive(PartialEq, Eq, Debug, Copy, Clone)]
    enum Point {
        Ash,
        Rock,
    }
    impl FromStr for Point {
        type Err = ParsePointError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            match s {
                "." => Ok(Self::Ash),
                "#" => Ok(Self::Rock),
                _ => Err(ParsePointError),
            }
        }
    }

    #[derive(Debug)]
    pub struct Pattern {
        points: Vec<Vec<Point>>,
        row_result: usize,
        col_result: usize,
    }

    impl Pattern {
        pub fn score(&self) -> usize {
            println!("{}, {}", self.row_result, self.col_result);
            self.row_result * 100 + self.col_result
        }

        fn get_same_val(
            arr: Vec<Option<Vec<usize>>>,
            val_to_ignore: Option<usize>,
        ) -> Option<usize> {
            if arr.iter().any(|v| v.is_none()) {
                return None;
            }

            let mut possible_results: Vec<usize> = Vec::new();
            arr.first()
                .unwrap()
                .as_ref()
                .unwrap()
                .iter()
                .for_each(|first_val| {
                    if let Some(ignore) = val_to_ignore {
                        if ignore != *first_val {
                            possible_results.push(*first_val);
                        }
                    } else {
                        possible_results.push(*first_val)
                    }
                });
            for opt in arr {
                opt.as_ref()
                    .unwrap()
                    .iter()
                    .for_each(|v| match possible_results.contains(v) {
                        false => {
                            possible_results.retain(|x| x != v);
                        }
                        true => (),
                    });
                possible_results = possible_results
                    .iter()
                    .filter(|v| opt.as_ref().unwrap().contains(v))
                    .map(|v| v.to_owned())
                    .collect_vec();
            }
            println!("possible result  - {:?}", possible_results);
            match possible_results.len() {
                0 => None,
                1 => Some(*possible_results.first().unwrap()),
                // apparently more than one match should just be invalid?
                _ => None,
            }
        }

        pub fn process(&mut self, row_to_ignore: Option<usize>, col_to_ignore: Option<usize>) {
            println!("\n\n");
            println!("{}", self);
            let mut row_vals = self
                .points
                .iter()
                .map(|r| Self::is_reflection(r))
                .collect::<Vec<_>>();
            if let Some(val) = Self::get_same_val(row_vals, col_to_ignore) {
                self.col_result = val;
            }
            let col_vals = self
                .points
                .first()
                .unwrap()
                .iter()
                .enumerate()
                .map(|(x, _)| {
                    let cols = self.points.iter().map(|r| *r.get(x).unwrap()).collect_vec();
                    Self::is_reflection(&cols.to_owned())
                })
                .collect_vec();
            if let Some(val) = Self::get_same_val(col_vals, row_to_ignore) {
                self.row_result = val;
            }
        }

        pub fn process_2(&mut self) {
            self.process(None, None);
            let invalid_row = self.row_result;
            let invalid_col = self.col_result;
            self.row_result = 0;
            self.col_result = 0;

            for (y, row) in self.points.clone().iter().enumerate() {
                for (x, val) in row.iter().enumerate() {
                    let original = val.clone();
                    match original {
                        Point::Ash => self.points[y][x] = Point::Rock,
                        Point::Rock => self.points[y][x] = Point::Ash,
                    }
                    self.process(Some(invalid_row), Some(invalid_col));
                    if self.row_result != 0 || self.col_result != 0 {
                        if self.row_result == invalid_row {
                            self.row_result = 0;
                        }
                        if self.col_result == invalid_col {
                            self.col_result = 0;
                        }
                        println!("{}, {}", self.row_result, self.col_result);
                        if self.row_result != 0 || self.col_result != 0 {
                            return;
                        }
                    }
                    self.points[y][x] = original;
                }
            }
        }

        fn is_reflection(points: &Vec<Point>) -> Option<Vec<usize>> {
            let mut result = Vec::new();
            for start in 0..=(points.len() - 2) {
                let mut left = points.iter().take(start + 1).rev();
                let mut right = points.iter().skip(start + 1);
                loop {
                    match (left.next(), right.next()) {
                        (Some(lp), Some(rp)) => {
                            if lp != rp {
                                break;
                            }
                        }
                        // only extra rows on the right
                        (None, Some(_)) => {
                            result.push(start + 1);
                            break;
                        }
                        // only extra rows on the left
                        (Some(_), None) => {
                            result.push(start + 1);
                            break;
                        }
                        (None, None) => {
                            result.push(start + 1);
                            break;
                        }
                    };
                }
            }
            if result.len() > 0 {
                Some(result)
            } else {
                None
            }
        }
    }
    impl fmt::Display for Pattern {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            let result = self
                .points
                .iter()
                .map(|r| {
                    r.iter()
                        .map(|p| match p {
                            Point::Ash => ".",
                            Point::Rock => "#",
                        })
                        .join("")
                })
                .join("\n");

            write!(f, "{}", result)
        }
    }

    impl FromStr for Pattern {
        type Err = ParsePatternError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let points = s
                .lines()
                .map(|line| {
                    line.chars()
                        .map(|c| Point::from_str(&c.to_string()).unwrap())
                        .collect()
                })
                .collect();
            Ok(Self {
                points,
                row_result: 0,
                col_result: 0,
            })
        }
    }
    #[cfg(test)]
    mod test {
        use std::str::FromStr;

        use crate::mirror::mirror::{Pattern, Point};

        // #[test]
        fn is_row_reflection() {
            let row = "#.##..##."
                .chars()
                .map(|c| Point::from_str(&c.to_string()).unwrap())
                .collect();
            assert_eq!(Pattern::is_reflection(&row), Some(vec![1, 2, 3, 5]));
            // let row_2 = ".##..##..##.#"
            //     .chars()
            //     .map(|c| Point::from_str(&c.to_string()).unwrap())
            //     .collect();
            // assert_eq!(Pattern::is_reflection(&row_2), Some(6));
            // let row_3 = "#.##..##..##"
            //     .chars()
            //     .map(|c| Point::from_str(&c.to_string()).unwrap())
            //     .collect();
            // assert_eq!(Pattern::is_reflection(&row_3), Some(7));
            // let row_4 = "#..#..#..##..##"
            //     .chars()
            //     .map(|c| Point::from_str(&c.to_string()).unwrap())
            //     .collect();
            // assert_eq!(Pattern::is_reflection(&row_4), Some(5));
            //
            // let row_5 = ".#.##.#.##..###"
            //     .chars()
            //     .map(|c| Point::from_str(&c.to_string()).unwrap())
            //     .collect();
            // assert_eq!(Pattern::is_reflection(&row_5), Some(4));
        }

        #[test]
        fn get_same_val_test() {
            let arr: Vec<Option<Vec<usize>>> = vec![Some(vec![1, 2]), None, Some(vec![1, 2])];
            let res = Pattern::get_same_val(arr, None);
            assert_eq!(res, None);
            let arr_2: Vec<Option<Vec<usize>>> = vec![Some(vec![1, 3]), Some(vec![1, 2])];
            let res_2 = Pattern::get_same_val(arr_2, None);
            assert_eq!(res_2, Some(1));
            let arr_3: Vec<Option<Vec<usize>>> =
                vec![Some(vec![1, 3]), Some(vec![1, 2]), Some(vec![2])];
            let res_3 = Pattern::get_same_val(arr_3, None);
            assert_eq!(res_3, None);
        }
    }
}
