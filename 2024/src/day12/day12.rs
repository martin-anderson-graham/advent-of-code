use std::{
    collections::{HashMap, HashSet, VecDeque},
    fmt::Display,
    rc::Rc,
    vec,
};

use common::{CardinalDirection, Part, Position, PuzzleParts};

#[derive(PartialEq, Eq, Debug, Hash, Clone)]
struct Fence {
    direction: CardinalDirection,
    position: Rc<Position>,
}

impl Fence {
    fn new(direction: CardinalDirection, position: Rc<Position>) -> Self {
        Self {
            direction,
            position,
        }
    }
}

enum Neighbor {
    Empty,
    Match,
    NotMatch,
}

trait Day12Position {
    fn get_cardinals(&self) -> Vec<Fence>;
    fn get_neighbor(&self, target: char, garden: &HashMap<Rc<Position>, char>) -> Neighbor;
}

impl Day12Position for Position {
    fn get_cardinals(&self) -> Vec<Fence> {
        vec![
            Fence::new(
                CardinalDirection::Down,
                Position::new(self.row + 1, self.col).into(),
            ),
            Fence::new(
                CardinalDirection::Up,
                Position::new(self.row - 1, self.col).into(),
            ),
            Fence::new(
                CardinalDirection::Left,
                Position::new(self.row, self.col - 1).into(),
            ),
            Fence::new(
                CardinalDirection::Right,
                Position::new(self.row, self.col + 1).into(),
            ),
        ]
    }

    fn get_neighbor(&self, target: char, garden: &HashMap<Rc<Position>, char>) -> Neighbor {
        match garden.get(&self.clone()) {
            None => Neighbor::Empty,
            Some(c) => match *c == target {
                true => Neighbor::Match,
                false => Neighbor::NotMatch,
            },
        }
    }
}

#[derive(Debug)]
struct Region {
    char: char,
    positions: HashSet<Rc<Position>>,
    perimter_list: HashSet<Fence>,
}

impl Display for Region {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let mut result = String::new();

        result += &("Char ".to_string() + &self.char.to_string() + "\n");
        self.perimter_list.iter().for_each(|p| {
            result += &(format!("{:?}", p) + "\n");
        });

        write!(f, "{}", result)
    }
}

impl Region {
    fn new(c: char) -> Self {
        Self {
            char: c,
            positions: HashSet::new(),
            perimter_list: HashSet::new(),
        }
    }

    fn mark_row_visited(&self, starting_fence: &Fence, visited_positions: &mut HashSet<Fence>) {
        let mut current_fence = starting_fence.clone();
        // go left
        while let Some(neighbor) = self.perimter_list.get(&Fence::new(
            starting_fence.direction.clone(),
            Position::new(starting_fence.position.row, current_fence.position.col - 1).into(),
        )) {
            visited_positions.insert(neighbor.clone());
            current_fence = neighbor.clone();
        }

        let mut current_fence_2 = starting_fence.clone();
        // go right
        while let Some(neighbor) = self.perimter_list.get(&Fence::new(
            starting_fence.direction.clone(),
            Position::new(
                starting_fence.position.row,
                current_fence_2.position.col + 1,
            )
            .into(),
        )) {
            visited_positions.insert(neighbor.clone());
            current_fence_2 = neighbor.clone();
        }
    }

    fn mark_col_visited(&self, starting_fence: &Fence, visited_positions: &mut HashSet<Fence>) {
        let mut current_fence = starting_fence.clone();
        // go up
        while let Some(neighbor) = self.perimter_list.get(&Fence::new(
            starting_fence.direction.clone(),
            Position::new(current_fence.position.row - 1, starting_fence.position.col).into(),
        )) {
            visited_positions.insert(neighbor.clone());
            current_fence = neighbor.clone();
        }

        let mut current_fence_2 = starting_fence.clone();
        // go down
        while let Some(neighbor) = self.perimter_list.get(&Fence::new(
            starting_fence.direction.clone(),
            Position::new(
                current_fence_2.position.row + 1,
                starting_fence.position.col,
            )
            .into(),
        )) {
            visited_positions.insert(neighbor.clone());
            current_fence_2 = neighbor.clone();
        }
    }

    fn get_number_sides(&self) -> usize {
        let mut side_count = 0;
        let mut visited_positions: HashSet<Fence> = HashSet::new();

        for current_fence in self.perimter_list.iter() {
            if visited_positions.get(&current_fence).is_some() {
                continue;
            }
            side_count += 1;
            visited_positions.insert(current_fence.clone());
            match current_fence.direction {
                CardinalDirection::Up | CardinalDirection::Down => {
                    self.mark_row_visited(&current_fence, &mut visited_positions)
                }
                CardinalDirection::Left | CardinalDirection::Right => {
                    self.mark_col_visited(&current_fence, &mut visited_positions)
                }
            };
        }

        side_count
    }
}

pub struct Day12 {
    garden: HashMap<Rc<Position>, char>,
    regions: Vec<Region>,
}

impl Day12 {
    pub fn new(input: &String) -> Self {
        Self {
            regions: vec![],
            garden: input
                .trim()
                .lines()
                .enumerate()
                .flat_map(|(row_index, row_line)| {
                    row_line
                        .trim()
                        .chars()
                        .enumerate()
                        .map(move |(col_index, c)| {
                            (
                                Position::new(
                                    row_index.try_into().unwrap(),
                                    col_index.try_into().unwrap(),
                                )
                                .into(),
                                c,
                            )
                        })
                })
                .collect(),
        }
    }

    fn generate_regions(&mut self) -> &Self {
        // walk each spot
        let mut visited: HashSet<Rc<Position>> = HashSet::new();

        let regions = self
            .garden
            .iter()
            .filter_map(|(starting_p, starting_char)| {
                if visited.get(starting_p).is_some() {
                    // we've been here, no need to start
                    return None;
                }

                visited.insert(starting_p.clone());

                let mut queue: VecDeque<Rc<Position>> = VecDeque::from([starting_p.clone()]);
                let mut region = Region::new(*starting_char);
                region.positions.insert(starting_p.clone());

                while let Some(current) = queue.pop_front() {
                    current.get_cardinals().iter().for_each(|neighbor| {
                        match neighbor.position.get_neighbor(region.char, &self.garden) {
                            Neighbor::Empty => {
                                region.perimter_list.insert(Fence::new(
                                    neighbor.direction.clone(),
                                    current.clone(),
                                ));
                            }
                            Neighbor::NotMatch => {
                                region.perimter_list.insert(Fence::new(
                                    neighbor.direction.clone(),
                                    current.clone(),
                                ));
                            }
                            Neighbor::Match => {
                                if region.positions.get(&neighbor.position.clone()).is_some() {
                                    return;
                                }
                                visited.insert(neighbor.position.clone());
                                region.positions.insert(neighbor.position.clone());
                                queue.push_back(neighbor.position.clone())
                            }
                        }
                    });
                }
                match region.positions.len() {
                    0 => None,
                    _ => Some(region),
                }
            })
            .collect();

        self.regions = regions;
        self
    }

    fn score_region(&self, part: Part) -> usize {
        match part {
            Part::One => self
                .regions
                .iter()
                .map(|region| region.positions.len() * region.perimter_list.len())
                .sum(),
            Part::Two => self
                .regions
                .iter()
                .map(|r| r.positions.len() * r.get_number_sides())
                .sum(),
        }
    }
}

impl PuzzleParts for Day12 {
    fn part_one(&mut self) -> String {
        self.generate_regions().score_region(Part::One).to_string()
    }

    fn part_two(&mut self) -> Option<String> {
        Some(self.generate_regions().score_region(Part::Two).to_string())
    }
}
