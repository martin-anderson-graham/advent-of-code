use common::PuzzleParts;

pub struct Day10 {
    lengths_1: Vec<usize>,
    pub lengths_2: Vec<usize>,
    rope: Vec<usize>,
    current_position: usize,
    skip_size: usize,
}

impl Day10 {
    pub fn new(input: &String) -> Self {
        Self {
            lengths_1: input
                .trim()
                .split(",")
                .map(|n| n.parse::<usize>().unwrap())
                .collect(),
            lengths_2: input
                .trim()
                .chars()
                .map(|c| (c as u8).to_string().parse::<usize>().unwrap())
                .chain(vec![17, 31, 73, 47, 23])
                .collect(),
            rope: (0..=255).collect(),
            current_position: 0,
            skip_size: 0,
        }
    }
}

impl PuzzleParts for Day10 {
    fn part_one(&mut self) -> String {
        self.process(Parts::One);
        (self.rope[0] * self.rope[1]).to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        for _ in 0..64 {
            self.process(Parts::Two);
        }

        let dense_hash = self.get_dense_hash();
        Some(dense_hash.iter().map(|n| format!("{:02x}", n)).collect::<Vec<_>>().join(""))
    }

}

enum Parts {
    One,
    Two,
}

impl Day10 {
    fn process(&mut self, part: Parts) {
        let lengths_iter = match part {
            Parts::One => self.lengths_1.iter(),
            Parts::Two => self.lengths_2.iter(),
        };
        lengths_iter.for_each(|length| {
            if self.current_position + length < self.rope.len() {
                // no wrapping
                self.rope[self.current_position..self.current_position + length].reverse();
            } else {
                // wrap the selection
                let selection_to_end = &self.rope[self.current_position..];
                let selection_from_beginning =
                    &self.rope[0..(self.current_position + length) % self.rope.len()];

                let mut new_values = Vec::new();
                new_values.extend_from_slice(selection_to_end);
                new_values.extend_from_slice(selection_from_beginning);
                // update all values
                new_values.reverse();
                new_values.iter().enumerate().for_each(|(i, value)| {
                    let index = (self.current_position + i) % self.rope.len();
                    self.rope[index] = *value;
                })
            }
            self.current_position += length + self.skip_size;
            self.current_position %= self.rope.len();
            self.skip_size += 1;
        })
    }

    fn get_dense_hash(&self) -> Vec<usize> {
        self.rope
            .chunks(16)
            .map(|chunk| {
                chunk
                    .to_vec()
                    .into_iter()
                    .reduce(|acc, val| acc ^ val)
                    .unwrap()
            })
            .collect::<Vec<usize>>()
    }
}
