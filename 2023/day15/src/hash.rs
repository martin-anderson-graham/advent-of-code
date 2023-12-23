pub mod hash {
    use std::str::FromStr;

    #[derive(Debug)]
    pub struct ParseHashError;

    #[derive(Debug)]
    enum Type {
        Add,
        Remove,
    }

    #[derive(Debug)]
    pub struct Content {
        label: String,
        value: u32,
    }

    #[derive(Debug)]
    pub struct Hash {
        raw: String,
        label: String,
        value: u32,
        action: Type,
        box_value: u32,
    }

    impl FromStr for Hash {
        type Err = ParseHashError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let mut box_value = 0;
            s.chars().for_each(|c| {
                if c.is_ascii_digit() {
                    box_value = c.to_digit(10).unwrap();
                }
            });

            Ok(Self {
                raw: s.to_string(),
                label: s
                    .chars()
                    .take_while(|c| c.is_ascii_alphabetic())
                    .map(|c| c.to_string())
                    .collect::<Vec<_>>()
                    .join(""),
                value: 0,
                action: match s.contains('=') {
                    true => Type::Add,
                    false => Type::Remove,
                },
                box_value,
            })
        }
    }

    impl Hash {
        fn process(&mut self) {
            self.raw.chars().for_each(|c| {
                self.value += c as u32;
                self.value *= 17;
                self.value %= 256;
            })
        }

        fn label_hash(&mut self) {
            self.label.chars().for_each(|c| {
                self.value += c as u32;
                self.value *= 17;
                self.value %= 256;
            })
        }
    }

    pub struct HashList {
        pub hashes: Vec<Hash>,
        pub boxes: Vec<Vec<Content>>,
    }

    impl HashList {
        pub fn new(raw: &str) -> Self {
            Self {
                hashes: raw
                    .split(",")
                    .map(|r| Hash::from_str(r).unwrap())
                    .collect::<Vec<_>>(),
                boxes: (0..256).map(|_| Vec::new()).collect(),
            }
        }

        pub fn process(&mut self, is_part_two: bool) {
            if !is_part_two {
                self.hashes.iter_mut().for_each(|h| h.process());
                return;
            }

            for h in self.hashes.iter_mut() {
                h.label_hash();
                let box_: &mut Vec<Content> = self.boxes.get_mut(h.value as usize).unwrap();
                match h.action {
                    Type::Remove => {
                        box_.retain(|c| c.label != h.label);
                    }
                    Type::Add => {
                        // find a matching lens label
                        match box_.iter_mut().find(|cont| cont.label == h.label) {
                            Some(content) => {
                                // replace contents
                                content.value = h.box_value.clone();
                            }
                            None => {
                                // add contents
                                box_.push(Content {
                                    label: h.label.clone(),
                                    value: h.box_value,
                                });
                            }
                        }
                    }
                };
            }
        }

        pub fn get_score(&self, is_part_two: bool) -> u32 {
            if !is_part_two {
                return self.hashes.iter().map(|h| h.value).sum();
            }
            self.boxes
                .iter()
                .enumerate()
                .map(|(box_index, contents)| {
                    contents
                        .iter()
                        .enumerate()
                        .map(|(label_index, content)| {
                            println!(
                                "{}",
                                (box_index as u32 + 1)
                                    * (label_index as u32 + 1)
                                    * content.value as u32
                            );
                            (box_index as u32 + 1) * (label_index as u32 + 1) * content.value as u32
                        })
                        .sum::<u32>()
                })
                .sum()
        }
    }
}
