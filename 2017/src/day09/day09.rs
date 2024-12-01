use common::PuzzleParts;

pub struct Day09 {
    input: String,
    pub cleaned_input: String,
}

impl Day09 {
    pub fn new(input: &String) -> Self {
        Self {
            input: input.to_string(),
            cleaned_input: String::from(""),
        }
    }

}

impl PuzzleParts for Day09 {
    fn part_one(&mut self) -> String {
        self.remove_garbage();
        self.score().to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        Some(self.remove_garbage().to_string())
    }

}

impl Day09 {
    pub fn remove_garbage(&mut self) -> usize {
        let mut removed_count = 0;
        let mut result = String::with_capacity(self.input.len());
        let mut index = 0;
        let mut removing_garbage = false;
        while index < self.input.len() {
            let c = self.input.get(index..index + 1).unwrap();

            // skip the next character
            if removing_garbage && c == "!" {
                index += 2;
                continue;
            }

            // start removing garbage
            if !removing_garbage && c == "<" {
                removing_garbage = true;
                index += 1;
                continue;
            }

            // end removing garbage
            if removing_garbage && c == ">" {
                removing_garbage = false;
                index += 1;
                continue;
            }

            // if we aren't removing garbage we add this character
            if !removing_garbage {
                result += c;
            } else {
                removed_count += 1;
            }

            index += 1;
        }

        self.cleaned_input = result;
        removed_count
    }

    fn score(&self) -> usize {
        let mut score = 0;
        let mut current_group_score = 0;
        self.cleaned_input.chars().for_each(|c| {
            match c {
                '{' => current_group_score += 1,
                '}' => {
                    score += current_group_score;
                    current_group_score -= 1;
                }
                _ => (),
            };
        });

        score
    }
}
