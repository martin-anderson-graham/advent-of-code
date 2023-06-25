#[derive(Debug, Clone)]
struct Rule {
    quantity: usize,
    from_index: usize,
    to_index: usize,
}

#[derive(Debug, Clone)]
struct Stack {
    crates: Vec<String>,
}

impl Stack {
    fn new() -> Self {
        Self {
            crates: Vec::<String>::new(),
        }
    }

    fn get_last(&self) -> String {
        match self.crates.last() {
            Some(val) => val.to_string(),
            None => String::new()
        }
    }

    fn get_n_crates(&mut self, n: usize) -> Vec<String> {
        let mut result = Vec::<String>::new();
        for _ in 0..n {
            result.push(self.crates.pop().unwrap());
        }
        result
    }

    fn add_crates(&mut self, crane: Vec<String>) {
        for letter in crane.iter() {
            self.crates.push(letter.to_string());
        } 
    }
}

#[derive(Debug)]
struct Board {
    stacks: Vec<Stack>,
    rules: Vec<Rule>,
}

impl Board {
    fn apply_rules(&mut self) {
        for rule in self.rules.as_slice() {
            let crane = self.stacks[rule.from_index - 1].get_n_crates(rule.quantity);
            self.stacks[rule.to_index - 1].add_crates(crane);
        }
    }
    fn apply_rules_two(&mut self) {
        for rule in self.rules.as_slice() {
            let mut crane = self.stacks[rule.from_index - 1].get_n_crates(rule.quantity);
            crane.reverse();
            self.stacks[rule.to_index - 1].add_crates(crane);
        }
    }
    fn get_result(&self) -> String {
        self.stacks.iter().map(|s| s.get_last()).fold(String::new(), |acc, ele| acc + &ele)
    }
}

fn main() {
    let ex1 = include_str!("ex1.txt");
    let input = include_str!("input.txt");
    assert_eq!(part_one(&ex1).unwrap(), "CMZ");
    assert_eq!(part_one(&input).unwrap(), "BSDMQFLSP");
    assert_eq!(part_two(&ex1).unwrap(), "MCD");
    assert_eq!(part_two(&input).unwrap(), "PGSQBFLDP");
}

fn part_one(s: &str) -> Result<String, String> {
    let mut board = match parse(s) {
        Ok(val) => val,
        Err(e) => panic!("{e}"),
    };

    board.apply_rules();

    Ok(board.get_result())
}

fn part_two(s: &str) -> Result<String, String> {
    let mut board = match parse(s) {
        Ok(val) => val,
        Err(e) => panic!("{e}"),
    };

    board.apply_rules_two();

    Ok(board.get_result())
}

fn parse(s: &str) -> Result<Board, String> {
    let mut stacks: Vec<Stack> = Vec::<_>::new();
    let mut parts = s.split("\n\n").into_iter();

    let Some(boxes) = parts.next() else {
        return Err("failed to read crate block".to_string())
    };
    let mut build_vec = true;
    for row in boxes.lines() {
        if build_vec {
            build_vec = false;
            stacks = vec![Stack::new(); (row.len() + 1) / 4];
        }
        for (i, val) in row.split("").enumerate() {
            if i % 4 == 2 && val != " " {
                stacks[(i + 2) / 4 - 1].crates.insert(0, val.to_string());
            }
        }
    }

    let mut rules_vec: Vec<Rule> = vec![];
    let Some(rules_raw) = parts.next() else {
        return Err("failed to read a rules block".to_string())
    };

    for rules_line in rules_raw.lines() {
        let mut rules = rules_line.split(" ");
        let (Some(_), Some(quantity_raw), Some(_), Some(from_index_raw), Some(_), Some(to_index_raw)) = (rules.next(),rules.next(),rules.next(),rules.next(),rules.next(),rules.next()) else {
            return Err("failed to read a rules row".to_string())
        };
        let (Ok(quantity), Ok(from_index), Ok(to_index)) = (quantity_raw.parse::<usize>(), from_index_raw.parse::<usize>(), to_index_raw.parse::<usize>()) else {
            return Err("failed to parse a rules as an integer".to_string())
        };
        rules_vec.push(Rule {
            quantity,
            from_index,
            to_index,
        })
    }

    Ok(Board {
        stacks,
        rules: rules_vec,
    })
}
