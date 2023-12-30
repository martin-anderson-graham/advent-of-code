pub mod puzzle {
    use std::{collections::HashMap, convert::identity, str::FromStr};

    #[derive(Debug)]
    pub struct ParsePuzzleError;

    #[derive(Debug, Copy, Clone, PartialEq, Eq)]
    enum Direction {
        Up,
        Down,
        Left,
        Right,
    }

    #[derive(Debug, PartialEq, Eq, Hash, Clone)]
    struct Loc {
        x: usize,
        y: usize,
        heat: usize,
    }

    #[derive(Debug)]
    struct Stat {
        min_distance: usize,
        dir: Direction,
        visited: bool,
    }

    #[derive(Debug)]
    pub struct Puzzle {
        num_rows: usize,
        num_cols: usize,
        node_stats: HashMap<(usize, usize), Stat>,
        locs: Vec<Vec<Loc>>,
    }

    impl FromStr for Puzzle {
        type Err = ParsePuzzleError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let points = s
                .lines()
                .enumerate()
                .map(|(r_index, l)| {
                    l.chars()
                        .enumerate()
                        .map(|(col_index, c)| Loc {
                            x: col_index,
                            y: r_index,
                            heat: c.to_digit(10).unwrap() as usize,
                        })
                        .collect::<Vec<_>>()
                })
                .collect::<Vec<_>>();

            Ok(Self {
                num_rows: points.len(),
                num_cols: points[0].len(),
                locs: points,
                node_stats: HashMap::new(),
            })
        }
    }
    impl Puzzle {
        fn is_four_in_a_row(&self, current_node: &Loc, dir: Direction) -> bool {
            let current_ns = self.node_stats.get(&(current_node.x, current_node.y));
            if let Some(ns) = current_ns {
                if ns.dir != dir {
                    return false;
                }
            } else {
                return false;
            }
            // get opposite direction of travel
            let (prior_x, prior_y) = match dir {
                Direction::Up => (current_node.x, current_node.y + 1),
                Direction::Down => {
                    if current_node.y == 0 {
                        return false;
                    }
                    (current_node.x, current_node.y - 1)
                }
                Direction::Left => (current_node.x + 1, current_node.y),
                Direction::Right => {
                    if current_node.x == 0 {
                        return false;
                    }
                    (current_node.x - 1, current_node.y)
                }
            };
            let Some(prior_row) = self.locs.get(prior_y) else {
                return false;
            };
            let Some(prior_loc) = prior_row.get(prior_x) else {
                return false;
            };

            let Some(ns) = self.node_stats.get(&(prior_loc.x, prior_loc.y)) else {
                return false;
            };
            if ns.dir != dir {
                return false;
            }

            // get opposite direction of travel
            let (pprior_x, pprior_y) = match dir {
                Direction::Up => (prior_loc.x, prior_loc.y + 1),
                Direction::Down => {
                    if prior_loc.y == 0 {
                        return false;
                    }
                    (prior_loc.x, prior_loc.y - 1)
                }
                Direction::Left => (prior_loc.x + 1, prior_loc.y),
                Direction::Right => {
                    if prior_loc.x == 0 {
                        return false;
                    }
                    (prior_loc.x - 1, prior_loc.y)
                }
            };
            let Some(pprior_row) = self.locs.get(pprior_y) else {
                return false;
            };
            let Some(pprior_loc) = pprior_row.get(pprior_x) else {
                return false;
            };

            let Some(ns) = self.node_stats.get(&(pprior_loc.x, pprior_loc.y)) else {
                return false;
            };

            ns.dir == dir
        }

        fn get_next_node(&self, current_node: &Loc, dir: Direction) -> Option<&Loc> {
            if self.is_four_in_a_row(current_node, dir) {
                return None;
            }
            match dir {
                Direction::Up => {
                    if current_node.y == 0 {
                        return None;
                    }
                    return Some(
                        self.locs
                            .get(current_node.y - 1)
                            .unwrap()
                            .get(current_node.x)
                            .unwrap(),
                    );
                }
                Direction::Down => {
                    if current_node.y == self.num_rows - 1 {
                        return None;
                    }
                    return Some(
                        self.locs
                            .get(current_node.y + 1)
                            .unwrap()
                            .get(current_node.x)
                            .unwrap(),
                    );
                }
                Direction::Left => {
                    if current_node.x == 0 {
                        return None;
                    }
                    return Some(
                        self.locs
                            .get(current_node.y)
                            .unwrap()
                            .get(current_node.x - 1)
                            .unwrap(),
                    );
                }
                Direction::Right => {
                    if current_node.x == self.num_cols - 1 {
                        return None;
                    }
                    return Some(
                        self.locs
                            .get(current_node.y)
                            .unwrap()
                            .get(current_node.x + 1)
                            .unwrap(),
                    );
                }
            }
        }
        pub fn process(&mut self) {
            // let starting_row = self.num_rows - 1;
            // let starting_col = self.num_cols - 1;
            let starting_row = 0;
            let starting_col = 0;

            let mut current_node = self
                .locs
                .get_mut(starting_col)
                .unwrap()
                .get_mut(starting_row)
                .unwrap()
                .clone();
            println!("{:?}, {}", current_node, current_node.heat);

            self.node_stats.insert(
                (current_node.x, current_node.y),
                Stat {
                    visited: true,
                    min_distance: 0,
                    dir: Direction::Down,
                },
            );

            let directions_to_visit = vec![
                Direction::Up,
                Direction::Down,
                Direction::Left,
                Direction::Right,
            ];

            loop {
                let current_node_min_heat =
                    if let Some(n) = self.node_stats.get(&(current_node.x, current_node.y)) {
                        n.min_distance
                    } else {
                        usize::MAX
                    };

                let valid_neighbors = directions_to_visit
                    .iter()
                    .map(|d| {
                        if let Some(n) = self.get_next_node(&current_node, *d) {
                            return Some((n.clone(), d));
                        } else {
                            return None;
                        }
                    })
                    .filter_map(identity)
                    .collect::<Vec<_>>();

                for (neighbor, current_dir) in valid_neighbors {
                    // we've seen this node before, let's see if it is a shorter distance
                    if let Some(stats) = self.node_stats.get(&(neighbor.x, neighbor.y)) {
                        if stats.min_distance > (neighbor.heat + current_node_min_heat)
                            && stats.visited == false
                        {
                            self.node_stats.insert(
                                (neighbor.x, neighbor.y),
                                Stat {
                                    min_distance: neighbor.heat + current_node_min_heat,
                                    dir: current_dir.clone(),
                                    visited: false,
                                },
                            );
                        }
                    } else {
                        // we haven't seen this node, go ahead an insert
                        self.node_stats.insert(
                            (neighbor.x, neighbor.y),
                            Stat {
                                min_distance: neighbor.heat + current_node_min_heat,
                                dir: current_dir.clone(),
                                visited: false,
                            },
                        );
                    }
                }
                let mut min = usize::MAX;
                let mut new_current: Option<(usize, usize)> = None;
                let mut new_direction = Direction::Down;
                // update current_node
                for (temp_loc, temp_val) in
                    self.node_stats.iter().filter(|(_, v)| v.visited == false)
                {
                    if temp_val.min_distance < min {
                        min = temp_val.min_distance;
                        new_current = Some(temp_loc.clone());
                        new_direction = temp_val.dir;
                    }
                }
                current_node = if let Some((new_x, new_y)) = new_current {
                    self.locs.get(new_y).unwrap().get(new_x).unwrap().clone()
                } else {
                    panic!("no current node?");
                };
                println!("{:?}, {}", current_node, min);
                self.node_stats.insert(
                    (current_node.x, current_node.y),
                    Stat {
                        visited: true,
                        min_distance: min,
                        dir: new_direction,
                    },
                );

                if self.node_stats.len() == self.num_cols * self.num_rows {
                    break;
                }
            }
        }

        pub fn score(&self) -> usize {
            for ns in &self.node_stats {
                println!("{:?}", ns);
            }
            self.node_stats
                .iter()
                .find(|(key, _)| key.0 == self.num_cols - 1 && key.1 == self.num_rows - 1)
                .unwrap()
                .1
                .min_distance
        }
    }
}
