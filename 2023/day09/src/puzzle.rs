pub mod puzzle {
    use std::str::FromStr;

    #[derive(Debug)]
    pub struct ParsePuzzleErr;

    pub struct Sequence {
        numbers: Vec<isize>,
    }

    impl FromStr for Sequence {
        type Err = ParsePuzzleErr;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            Ok(Self {
                numbers: s
                    .split(" ")
                    .map(|s| s.parse::<isize>().unwrap())
                    .collect::<Vec<_>>(),
            })
        }
    }

    impl Sequence {
        fn not_all_equal(seq: Vec<isize>) -> bool {
            !seq.iter().all(|v| seq[0] == *v)
        }

        fn get_next_generation(seq: &Vec<isize>) -> Vec<isize> {
            let mut result: Vec<isize> = Vec::new();
            seq.windows(2).for_each(|window| {
                result.push(window[1] - window[0]);
            });
            result
        }

        pub fn find_next(&self) -> isize {
            let mut partial_seq = self.numbers.clone();
            println!("partial - {:?}", partial_seq);
            let mut lasts: Vec<isize> = Vec::new();
            while Sequence::not_all_equal(partial_seq.clone()) {
                lasts.push(*partial_seq.last().unwrap());
                partial_seq = Sequence::get_next_generation(&partial_seq);
                println!("partial - {:?}", partial_seq);
            }
            println!("{}", partial_seq[0]);
            println!("lasts - {:?}", lasts);
            let mut last_row_val = partial_seq[0];
            lasts.iter().rev().for_each(|n| {
                last_row_val += n;
            });
            println!("result = {}", last_row_val);
            println!("");
            last_row_val
        }

        pub fn find_prev(&self) -> isize {
            let mut partial_seq = self.numbers.clone();
            println!("partial - {:?}", partial_seq);
            let mut firsts: Vec<isize> = Vec::new();
            while Sequence::not_all_equal(partial_seq.clone()) {
                firsts.push(*partial_seq.first().unwrap());
                partial_seq = Sequence::get_next_generation(&partial_seq);
                println!("partial - {:?}", partial_seq);
            }
            println!("bottom-row-val - {}", partial_seq[0]);
            println!("firsts - {:?}", firsts);
            let mut last_row_val = partial_seq[0];
            firsts.iter().rev().for_each(|n| {
                last_row_val = n - last_row_val;
                println!("subtraction result - {}", last_row_val);
            });
            println!("result = {}", last_row_val);
            println!("");
            last_row_val
        }
    }
}
