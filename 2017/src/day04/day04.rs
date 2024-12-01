use std::collections::{HashMap, HashSet};

use common::PuzzleParts;

pub struct Day04 {
    input: String,
}

impl Day04 {

    pub fn new(input: &String) -> Self {
        Day04 {
            input: input.clone(),
        }
    }
}

impl PuzzleParts for Day04 {
    fn part_one(&mut self) -> String {
        let result = part_one(&self.input);
        result.to_string()
    }
    fn part_two(&mut self) -> Option<String> {
        let result = part_two(&self.input);
        Some(result.to_string())
    }
}

fn is_valid(line: &str) -> bool {
    let mut map: HashSet<String> = HashSet::new();
    for w in line.split_whitespace() {
        if map.get(w).is_some() {
            return false;
        }
        map.insert(w.to_string());
    }

    true
}

fn part_one(input: &String) -> usize {
    input.trim().lines().filter(|line| is_valid(line)).count()
}

fn build_char_set(word: &str) -> HashMap<char, usize> {
    let mut result = HashMap::new();
    word.chars().for_each(|c| {
        match result.get(&c) {
            Some(val) => result.insert(c, val + 1),
            None => result.insert(c, 1),
        };
    });

    result
}

fn is_anagram(word: &str, words: &Vec<String>) -> bool {
    if words.len() == 0 {
        return false
    }
    let word_hash = build_char_set(word);
    'outer: for w in words.iter() {
        let w_hash = build_char_set(w);
        if word_hash.len() != w_hash.len() {
            continue 'outer;
        }
        for (k, v) in word_hash.iter() {
            match w_hash.get(k) {
                Some(val) => {
                    if val != v {
                        continue 'outer;
                    }
                }
                None => continue 'outer,
            }
        }
       return true
    }
    false
}

#[cfg(test)]
mod tests_day04 {
    use crate::day04::day04::is_anagram;

    #[test]
    fn is_anagram_test(){
        // assert_eq!(is_anagram("abcde", &vec![String::from("ecdab")]), true);
        assert_eq!(is_anagram("nrmyllg", &vec![
                String::from("dtjr"),
                String::from("baxkj"),
                String::from("lmnyrlg"),
        ]), true);
    }
}

fn part_two(input: &String) -> usize {
    let mut result = 0;
    'line: for line in input.trim().lines() {
        let mut words: Vec<String> = vec![];
        for word in line.split_whitespace() {
            if is_anagram(word, &words) {
                continue 'line;
            }
            words.push(word.to_string());
        }
        result += 1;
    }
    result
}
