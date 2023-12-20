pub mod puzzle {
    use std::{collections::HashMap, str::FromStr};

    #[derive(Debug)]
    pub struct ParseRecordError;

    #[derive(Debug)]
    struct ParseSPointError;

    #[derive(Debug, Clone, Copy)]
    enum SPoint {
        Operational,
        Damaged,
        Unknown,
    }
    impl FromStr for SPoint {
        type Err = ParseSPointError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            match s {
                "." => Ok(Self::Operational),
                "#" => Ok(Self::Damaged),
                "?" => Ok(Self::Unknown),
                _ => Err(ParseSPointError),
            }
        }
    }

    #[derive(Debug)]
    pub struct Record {
        spring: Vec<SPoint>,
        sequence: Vec<usize>,
        hash: HashMap<(usize, usize, usize), usize>,
    }

    impl FromStr for Record {
        type Err = ParseRecordError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let (raw_spring, raw_seq) = s.split_once(" ").unwrap();

            Ok(Self {
                spring: raw_spring
                    .chars()
                    .map(|s| SPoint::from_str(&s.to_string()).unwrap())
                    .collect(),
                sequence: raw_seq
                    .split(",")
                    .map(|v| v.parse::<_>().unwrap())
                    .collect(),
                hash: HashMap::new(),
            })
        }
    }

    impl Record {
        fn count_iterations(
            &mut self,
            candidate_len: usize,
            current_streak_len: usize,
            current_seq_index: usize,
        ) -> usize {
            // check the hash first
            if let Some(res) =
                self.hash
                    .get(&(candidate_len, current_streak_len, current_seq_index))
            {
                return *res;
            }
            let result;
            // we are at the end of the spring
            if candidate_len == self.spring.len() {
                // but we must have used all sequences
                match self.sequence.get(current_seq_index) {
                    Some(target_seq_len) => {
                        // we got the last item
                        if self.sequence.len() == current_seq_index + 1 {
                            if current_streak_len == *target_seq_len {
                                result = 1;
                            } else {
                                result = 0;
                            };
                        } else {
                            // we didn't get the last item
                            result = 0;
                        };
                    }
                    None => {
                        result = 1;
                    }
                };
            } else {
                if let Some(target_seq_len) = self.sequence.get(current_seq_index) {
                    result = match (
                        self.spring[candidate_len],
                        current_streak_len == *target_seq_len,
                    ) {
                        // if the next char is # and we are at the target len
                        (SPoint::Damaged, true) => {
                            return 0;
                        }
                        // if the next char is # and we are't at target len
                        (SPoint::Damaged, false) => self.count_iterations(
                            candidate_len + 1,
                            current_streak_len + 1,
                            current_seq_index,
                        ),
                        // if the next char is . and we are at the target len
                        (SPoint::Operational, true) => {
                            self.count_iterations(candidate_len + 1, 0, current_seq_index + 1)
                        }
                        // if the next char is . and we are not at the target len
                        (SPoint::Operational, false) => match current_streak_len {
                            // we haven't started a seq yet
                            0 => self.count_iterations(candidate_len + 1, 0, current_seq_index),
                            // we have, so impossible
                            _ => return 0,
                        },
                        // next char is ? and we are at the target len
                        // we add a dot
                        (SPoint::Unknown, true) => {
                            self.count_iterations(candidate_len + 1, 0, current_seq_index + 1)
                        }
                        // next char is ? and we aren't at target len
                        (SPoint::Unknown, false) => match current_streak_len {
                            // we haven't started a streak yet
                            // try adding . and #
                            0 => {
                                self.count_iterations(candidate_len + 1, 0, current_seq_index)
                                    + self.count_iterations(candidate_len + 1, 1, current_seq_index)
                            }
                            // continue the streak
                            _ => self.count_iterations(
                                candidate_len + 1,
                                current_streak_len + 1,
                                current_seq_index,
                            ),
                        },
                    };
                } else {
                    // if we are out sequences to use
                    match self.spring[candidate_len] {
                        // if the next char is # we are impossible
                        SPoint::Damaged => result = 0,
                        _ => {
                            // otherwise we add a .
                            result = self.count_iterations(candidate_len + 1, 0, current_seq_index);
                        }
                    };
                };
            };
            self.hash.insert(
                (candidate_len, current_streak_len, current_seq_index),
                result,
            );
            return result;
        }

        pub fn get_num_iterations(&mut self) -> usize {
            self.count_iterations(0, 0, 0)
        }

        pub fn new(raw: &str) -> Result<Self, ParseRecordError> {
            let (raw_spring, raw_seq) = raw.split_once(" ").unwrap();
            let new_raw_spring = vec![raw_spring; 5].join("?");
            let new_raw_seq = vec![raw_seq; 5].join(",");

            Ok(Self {
                spring: new_raw_spring
                    .chars()
                    .map(|s| SPoint::from_str(&s.to_string()).unwrap())
                    .collect(),
                sequence: new_raw_seq
                    .split(",")
                    .map(|v| v.parse::<_>().unwrap())
                    .collect(),
                hash: HashMap::new(),
            })
        }
    }

    #[cfg(test)]
    mod tests {
        use std::str::FromStr;

        use crate::puzzle::puzzle::Record;

        #[test]
        fn test_count_iterations() {
            let mut record = Record::from_str("???.### 1,1,3").unwrap();
            assert_eq!(record.count_iterations(0, 0, 0), 1);
        }

        #[test]
        fn test_count_iterations_2() {
            let mut record = Record::from_str("?###???????? 3,2,1").unwrap();
            assert_eq!(record.count_iterations(0, 0, 0), 10);
        }
    }
}
