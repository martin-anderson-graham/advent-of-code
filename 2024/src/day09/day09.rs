use common::{Part, PuzzleParts};
use itertools::Itertools;

#[derive(Clone)]
enum Item {
    File(File),
    EmptySpace(usize),
}

#[derive(Clone, Debug, Copy)]
struct File {
    id: usize,
    size: usize,
}

impl File {
    fn new(size_char: &char, id: usize) -> Self {
        Self {
            size: size_char.to_string().parse().unwrap(),
            id,
        }
    }
}
pub struct Day09 {
    input: String,
}

impl Day09 {
    pub fn new(input: &String) -> Self {
        Self {
            input: input.trim().to_string(),
        }
    }

    fn process(input: &String, part: Part) -> Vec<Item> {
        let disk = input
            .chars()
            .chunks(2)
            .into_iter()
            .enumerate()
            .map(|(idx, mut chunk)| {
                let mut next_bit = vec![];
                if let Some(val) = chunk.next() {
                    next_bit.push(Item::File(File::new(&val, idx)));
                };
                if let Some(val) = chunk.next() {
                    next_bit.push(Item::EmptySpace(val.to_string().parse().unwrap()));
                };
                next_bit
            })
            .flatten()
            .collect::<Vec<_>>();

        match part {
            Part::One => {
                let mut reved_files = disk
                    .iter()
                    .filter_map(|i| match i {
                        Item::File(f) => Some(std::iter::repeat_n(f.clone(), f.size)),
                        Item::EmptySpace(_) => None,
                    })
                    .flatten()
                    .rev();
                let mut replaced_count = 0;
                let result = disk.iter().fold(vec![], |mut acc, item| {
                    match item {
                        Item::File(f) => {
                            std::iter::repeat_n(f, f.size)
                                .for_each(|f| acc.push(Item::File(f.clone())));
                        }
                        Item::EmptySpace(val) => {
                            for _ in 0..*val {
                                acc.push(Item::File(
                                    reved_files
                                        .next()
                                        .expect("tried to take off a rev and got nothing")
                                        .clone(),
                                ))
                            }
                            replaced_count += *val;
                        }
                    };
                    acc
                });
                return result[0..result.len() - replaced_count].to_vec();
            }
            Part::Two => {
                let reved_files = disk
                    .iter()
                    .filter_map(|i| match i {
                        Item::File(f) => Some(f.clone()),
                        Item::EmptySpace(_) => None,
                    })
                    .rev();

                let mut disk_vec = disk.to_vec();
                // methods - remove all files based on a file id
                // find left most contiguious space given id

                reved_files.for_each(|f| {
                    Day09::move_file(&mut disk_vec, &f);
                });

                disk_vec
            }
        }
    }

    fn move_file(disk: &mut Vec<Item>, file: &File) {
        let current_index = disk
            .iter()
            .enumerate()
            .find(|(_, i)| match i {
                Item::File(f) => f.id == file.id,
                Item::EmptySpace(_) => false,
            })
            .unwrap()
            .0;

        let mut index_to_place: Option<(usize, usize)> = None;
        disk.iter_mut().enumerate().for_each(|(idx, i)| {
            if idx >= current_index {
                return;
            }
            if index_to_place.is_some() {
                return;
            }
            match i {
                Item::File(_) => (),
                Item::EmptySpace(size) => {
                    if file.size > *size {
                        return;
                    }
                    index_to_place = Some((idx, *size));
                }
            }
        });
        if let Some(idx) = index_to_place {
            disk[idx.0] = Item::File(file.clone());
            // the file doesn't take up the full space
            disk[current_index] = Item::EmptySpace(file.size);
            if idx.1 > file.size {
                disk.insert(idx.0 + 1, Item::EmptySpace(idx.1 - file.size));
            }
        }
    }

    fn get_checksum(output: &Vec<Item>, part: Part) -> String {
        match part {
            Part::One => output
                .iter()
                .enumerate()
                .fold(0, |mut acc: usize, (idx, item)| {
                    match item {
                        Item::File(file) => acc += idx * file.id,
                        Item::EmptySpace(_) => (),
                    };
                    acc
                })
                .to_string(),
            Part::Two => output
                .iter()
                .fold(vec![], |mut acc, i| match i {
                    Item::File(f) => {
                        std::iter::repeat_n(f, f.size)
                            .for_each(|f| acc.push(Item::File(f.clone())));
                        acc
                    }
                    Item::EmptySpace(size) => {
                        std::iter::repeat_n(0, *size).for_each(|v| acc.push(Item::EmptySpace(v)));
                        acc
                    }
                })
                .into_iter()
                .enumerate()
                .fold(0, |mut acc: usize, (idx, item)| {
                    match item {
                        Item::File(file) => acc += idx * file.id,
                        Item::EmptySpace(_) => (),
                    };
                    acc
                })
                .to_string(),
        }
    }
}

impl PuzzleParts for Day09 {
    fn part_one(&mut self) -> String {
        let output = Day09::process(&self.input, Part::One);
        Day09::get_checksum(&output, Part::One)
    }

    fn part_two(&mut self) -> Option<String> {
        let output = Day09::process(&self.input, Part::Two);

        Some(Day09::get_checksum(&output, Part::Two))
    }
}
