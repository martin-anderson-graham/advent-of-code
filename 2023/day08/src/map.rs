pub mod map {
    use std::{collections::HashMap, str::FromStr};

    fn get_lcm(first: usize, second: usize) -> usize {
        println!("starting - {first} - {second}");
        let mut gcd = 1;

        let min = if second > first { first } else { second };
        for i in 1..=min {
            if first % i == 0 && second % i == 0 {
                gcd = i;
            }
        }

        (first * second) / gcd
    }

    #[derive(Debug)]
    pub struct ParseMapError;
    #[derive(Debug)]
    pub struct ParseMoveError;
    #[derive(Debug)]
    pub struct ParseNodeError;

    #[derive(Debug, PartialEq, Eq, Hash)]
    struct Node {
        name: String,
        left: String,
        right: String,
    }

    impl FromStr for Node {
        type Err = ParseNodeError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let (name, raw_instructions) = s.split_once(" = ").unwrap();

            let parens: &[_] = &['(', ')'];
            let (left, right) = raw_instructions
                .trim_matches(parens)
                .split_once(", ")
                .unwrap();

            Ok(Self {
                name: name.to_string(),
                left: left.to_string(),
                right: right.to_string(),
            })
        }
    }

    #[derive(Debug)]
    enum Move {
        Left,
        Right,
    }

    impl FromStr for Move {
        type Err = ParseMoveError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            match s {
                "L" => Ok(Move::Left),
                "R" => Ok(Move::Right),
                _ => Err(ParseMoveError),
            }
        }
    }

    #[derive(Debug)]
    pub struct Map {
        nodes: HashMap<String, Node>,
        moves: Vec<Move>,
    }

    impl FromStr for Map {
        type Err = ParseMapError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let (raw_moves, raw_nodes) = s.split_once("\n\n").unwrap();
            let moves = raw_moves
                .chars()
                .map(|c| Move::from_str(&c.to_string()).unwrap())
                .collect::<Vec<_>>();
            let mut nodes = HashMap::new();
            raw_nodes
                .lines()
                .map(|l| Node::from_str(&l).unwrap())
                .for_each(|node| {
                    nodes.insert(node.name.clone(), node);
                });

            Ok(Self { moves, nodes })
        }
    }
    impl Map {
        pub fn score(&self, is_part_one: bool) -> usize {
            if is_part_one {
                let start_node = self.nodes.get("AAA").unwrap();
                return self.score_node(start_node);
            }

            let mut score_map: HashMap<String, usize> = HashMap::new();

            let mut lcm: usize = 1;
            let teset = self.nodes.values().filter(|n| n.name.ends_with("A"));

            let scs = teset.map(|n| {
                if let Some(score) = score_map.get(&n.name) {
                    return *score;
                } else {
                    let sc = self.score_node(n);
                    score_map.insert(n.name.to_string(), sc);
                    return sc;
                };
            }).collect::<Vec<_>>();
            scs.iter().for_each(|score| {
                lcm = get_lcm(score.clone(), lcm);
            });

            lcm
        }

        fn score_node(&self, start_node: &Node) -> usize {
            let mut count = 0;
            let mut index = 0;
            let instructions_len = self.moves.len();
            let mut current_node = start_node;
            loop {
                if current_node.name.ends_with("Z") {
                    return count;
                }
                count += 1;
                index = index % instructions_len;
                match self.moves.get(index).unwrap() {
                    Move::Right => current_node = self.nodes.get(&current_node.right).unwrap(),
                    Move::Left => current_node = self.nodes.get(&current_node.left).unwrap(),
                }
                index += 1;
            }
        }
    }
}
