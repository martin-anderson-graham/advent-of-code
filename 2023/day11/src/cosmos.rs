pub mod cosmos {
    use std::str::FromStr;
    #[derive(Debug)]
    pub struct ParseCosmosErr;

    #[derive(Debug)]
    struct ParsePointErr;

    #[derive(PartialEq, Eq, Clone, Debug)]
    enum Point {
        Galaxy,
        Empty,
    }
    impl FromStr for Point {
        type Err = ParsePointErr;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            match s {
                "." => Ok(Self::Empty),
                "#" => Ok(Self::Galaxy),
                _ => Err(ParsePointErr),
            }
        }
    }

    impl Point {
        fn get_char(&self) -> &str {
            match self {
                Self::Galaxy => "#",
                Self::Empty => ".",
            }
        }
    }

    #[derive(Debug)]
    struct Galaxy {
        x: isize,
        y: isize,
    }

    #[derive(Debug)]
    pub struct Cosmos {
        points: Vec<Vec<Point>>,
        width: usize,
        height: usize,
        extra_rows: Vec<isize>,
        extra_cols: Vec<isize>,
    }

    impl FromStr for Cosmos {
        type Err = ParseCosmosErr;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let mut points = vec![];
            s.lines().enumerate().for_each(|(row, line)| {
                points.push(vec![]);
                line.chars().for_each(|c| {
                    points[row].push(Point::from_str(&c.to_string()).unwrap());
                });
            });
            let width = points[0].len();
            let height = points.len();

            Ok(Self {
                points,
                height,
                width,
                extra_rows: Vec::new(),
                extra_cols: Vec::new(),
            })
        }
    }

    impl Cosmos {
        pub fn print_grid(&self) {
            for row in &self.points {
                println!(
                    "{}",
                    row.iter()
                        .map(|p| p.get_char())
                        .collect::<Vec<_>>()
                        .join("")
                );
            }
        }

        pub fn expand(&mut self) {
            let mut rows_to_expand: Vec<_> = vec![];
            let mut cols_to_expand: Vec<_> = vec![];

            // get empty rows
            self.points.iter().enumerate().for_each(|(y, row)| {
                if row.iter().all(|p| *p == Point::Empty) {
                    rows_to_expand.insert(0, y.try_into().unwrap());
                }
            });

            // get empty cols
            for x in 0..self.points[0].len() {
                if self
                    .points
                    .iter()
                    .map(|row| &row[x])
                    .all(|p| *p == Point::Empty)
                {
                    cols_to_expand.insert(0, x.try_into().unwrap());
                }
            }
            self.extra_rows = rows_to_expand;
            self.extra_cols = cols_to_expand;
        }

        fn get_galaxies(&self) -> Vec<Galaxy> {
            let mut result = vec![];
            for (y, row) in self.points.iter().enumerate() {
                for (x, point) in row.iter().enumerate() {
                    match point {
                        Point::Galaxy => result.push(Galaxy {
                            x: x.try_into().unwrap(),
                            y: y.try_into().unwrap(),
                        }),
                        Point::Empty => continue,
                    }
                }
            }
            result
        }

        fn get_galaxy_distance(&self, first: &Galaxy, second: &Galaxy, extra_rows: isize) -> isize {
            let first_row_offset = &self
                .extra_cols
                .iter()
                .filter(|v| **v < first.x)
                .count()
                .try_into()
                .unwrap()
                * extra_rows;
            let second_row_offset = &self
                .extra_cols
                .iter()
                .filter(|v| **v < second.x)
                .count()
                .try_into()
                .unwrap()
                * extra_rows;

            let first_col_offset = &self
                .extra_rows
                .iter()
                .filter(|v| **v < first.y)
                .count()
                .try_into()
                .unwrap()
                * extra_rows;
            let second_col_offset = &self
                .extra_rows
                .iter()
                .filter(|v| **v < second.y)
                .count()
                .try_into()
                .unwrap()
                * extra_rows;
            let res = (first_row_offset + first.x - (second.x + second_row_offset)).abs()
                + (first_col_offset + first.y - (second.y + second_col_offset)).abs();
            // println!("{:?}, {:?}, {}", first, second, res);
            res
        }

        pub fn score(&self, extra_rows: isize) -> isize {
            let mut score = 0;
            let galaxies = self.get_galaxies();
            // println!("{:?}", self);
            for (n, first) in galaxies.iter().enumerate() {
                for second in galaxies.iter().skip(n + 1) {
                    // println!("{:?}, {:?}, {}", first, second, self.get_galaxy_distance(first, second, extra_rows));
                    score += self.get_galaxy_distance(first, second, extra_rows);
                }
            }
            score
        }
    }
}
