use std::{
    collections::{HashMap, HashSet},
    fmt::Display,
    str::FromStr,
};

use colorized::{Color, Colors};
use common::{ParsePuzzleErr, PuzzleParts};

#[derive(Debug, Clone)]
struct Disc {
    name: String,
    weight: usize,
    // weight of itself + held
    total_weight: usize,
    holding: HashSet<String>,
    held_by: Option<String>,
}

#[derive(Debug)]
pub struct Day07 {
    discs: HashMap<String, Disc>,
}

impl PuzzleParts for Day07 {
    fn part_one(&mut self) -> String {
        self.build_tree();
        self.get_root_disc()
    }

    fn part_two(&mut self) -> Option<String> {
        self.build_tree();
        self.build_weights(&self.get_root_disc());
        Some(
            self.find_missing_weight(&self.get_root_disc())
                .unwrap()
                .to_string(),
        )
    }

    fn new(input: &String) -> Self {
        let mut discs = HashMap::new();
        input.trim().lines().for_each(|l| {
            match Disc::from_str(l) {
                Ok(val) => discs.insert(val.name.clone(), val),
                _ => {
                    println!(" -- {} parsing line {}", "error".color(Colors::RedFg), l);
                    std::process::exit(1);
                }
            };
        });
        Self { discs }
    }
}

impl Day07 {
    fn build_tree(&mut self) {
        let mut holder_held: HashMap<String, Vec<String>> = HashMap::new();
        self.discs.iter_mut().for_each(|(holder_name, disc)| {
            holder_held.insert(
                holder_name.to_string(),
                disc.holding.clone().into_iter().collect(),
            );
        });

        holder_held.iter().for_each(|(holder_name, held_names)| {
            held_names.iter().for_each(|held_name| {
                match self.discs.get_mut(held_name) {
                    Some(d) => d.held_by = Some(holder_name.clone()),
                    None => {
                        println!(
                            " -- {} no disc named {} found to set `held_by` on",
                            "error".color(Colors::RedFg),
                            held_name.color(Colors::GreenFg)
                        );
                        panic!();
                    }
                };
            })
        })
    }

    fn build_weights(&mut self, disc: &String) -> usize {
        let holding = {
            let disc = self.discs.get_mut(disc).unwrap();
            // base case, disc not holding anything returns its own weight
            if disc.holding.is_empty() {
                disc.total_weight = disc.weight;
                return disc.weight;
            }
            disc.holding.clone()
        };

        // get the weight for each sub-tree
        let held_weight: usize = holding
            .iter()
            .map(|held_name| self.build_weights(&held_name))
            .sum();

        // otherwise return the sum of all three
        let disc = self.discs.get_mut(disc).unwrap();
        disc.total_weight = held_weight + disc.weight;
        disc.total_weight
    }

    fn get_root_disc(&self) -> String {
        for disc in self.discs.values() {
            if disc.held_by.is_none() {
                return disc.name.clone();
            }
        }
        println!(" -- {} no root disc found", "error".color(Colors::RedFg));
        std::process::exit(1);
    }

    fn find_missing_weight(&self, disc_name: &String) -> Option<usize> {
        let disc = self.discs.get(disc_name).unwrap();
        if disc.holding.is_empty() {
            return None;
        };

        let held_discs: Vec<&Disc> = disc
            .holding
            .iter()
            .map(|held_name| self.discs.get(held_name).unwrap())
            .collect();

        let held_disc_weight_iter = held_discs.iter().map(|d| d.total_weight);

        let max = held_disc_weight_iter.clone().max().unwrap();
        let min = held_disc_weight_iter.clone().min().unwrap();

        // we've found our culprit tree!
        if max != min {
            // However, we need to check down the tree as far as we can
            for held_name in disc.holding.iter() {
                match self.find_missing_weight(held_name) {
                    Some(val) => return Some(val),
                    None => continue,
                }
            }
            let max_count = held_disc_weight_iter.clone().filter(|v| *v == max).count();
            let min_count = held_disc_weight_iter.clone().filter(|v| *v == min).count();

            if min_count > max_count {
                // max count is the odd one, we need to decrease the discs weight
                let max_disc = held_discs
                    .iter()
                    .filter(|d| d.total_weight == max)
                    .next()
                    .unwrap();
                return Some(max_disc.weight - (max - min));
            } else {
                // min count is the odd one, we need to increase the discs weight
                let min_disc = held_discs
                    .iter()
                    .filter(|d| d.total_weight == min)
                    .next()
                    .unwrap();
                return Some(min_disc.weight + (max - min));
            }
        }

        // return the recursive call
        for held_name in disc.holding.iter() {
            match self.find_missing_weight(held_name) {
                Some(val) => return Some(val),
                None => continue,
            }
        }
        None
    }
}

impl Display for Day07 {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let mut result = "".to_string();

        self.discs.values().for_each(|d| {
            result += &format!("{:?}", d).to_string();
            result += "\n";
        });

        write!(f, "{}", result)
    }
}

impl FromStr for Disc {
    type Err = ParsePuzzleErr;

    // parses a single line
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut line_iter = s.trim().split_whitespace();
        let name = line_iter.next().unwrap();
        let unparsed_weight = line_iter.next().unwrap();
        let weight = unparsed_weight.replace(")", "").replace("(", "");

        match line_iter.next() {
            // there are following discs
            Some(_) => {
                let mut holding = HashSet::new();
                while let Some(val) = line_iter.next() {
                    holding.insert(val.replace(",", "").to_string());
                }
                return Ok(Self {
                    name: name.to_string(),
                    weight: weight.parse::<usize>().unwrap(),
                    holding,
                    held_by: None,
                    total_weight: 0,
                });
            }
            None => (),
        };

        Ok(Self {
            name: name.to_string(),
            weight: weight.parse::<usize>().unwrap(),
            holding: HashSet::new(),
            held_by: None,
            total_weight: 0,
        })
    }
}
