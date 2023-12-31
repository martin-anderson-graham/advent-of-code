pub mod machine {
    use std::{collections::HashMap, str::FromStr};

    #[derive(Debug)]
    pub struct ParseMachineError;
    #[derive(Debug)]
    struct ParsePartError;
    #[derive(Debug)]
    struct ParseInstructionError;
    #[derive(Debug)]
    struct ParseConditionalRuleError;

    #[derive(Debug)]
    struct Part {
        x: usize,
        m: usize,
        a: usize,
        s: usize,
    }
    impl Part {
        fn score(&self) -> usize {
            self.x + self.m + self.a + self.s
        }
    }

    impl FromStr for Part {
        type Err = ParsePartError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let mut iter = s.split(",");
            let x = iter
                .next()
                .unwrap()
                .chars()
                .filter(|c| c.is_ascii_digit())
                .map(|c| c.to_string())
                .collect::<Vec<_>>()
                .join("")
                .parse::<usize>()
                .unwrap();

            let m = iter
                .next()
                .unwrap()
                .chars()
                .filter(|c| c.is_ascii_digit())
                .map(|c| c.to_string())
                .collect::<Vec<_>>()
                .join("")
                .parse::<usize>()
                .unwrap();

            let a = iter
                .next()
                .unwrap()
                .chars()
                .filter(|c| c.is_ascii_digit())
                .map(|c| c.to_string())
                .collect::<Vec<_>>()
                .join("")
                .parse::<usize>()
                .unwrap();

            let s = iter
                .next()
                .unwrap()
                .chars()
                .filter(|c| c.is_ascii_digit())
                .map(|c| c.to_string())
                .collect::<Vec<_>>()
                .join("")
                .parse::<usize>()
                .unwrap();

            Ok(Self { x, m, a, s })
        }
    }
    #[derive(Debug)]
    enum Compare {
        LessThan,
        GreaterThan,
    }

    #[derive(Debug)]
    enum Category {
        X,
        M,
        A,
        S,
    }

    #[derive(Debug, Clone)]
    enum RuleOutput {
        Accept,
        Reject,
        Rule(String),
    }

    #[derive(Debug)]
    struct ConditionalRule {
        category: Category,
        comparison: Compare,
        target_value: usize,
        output: RuleOutput,
    }

    impl ConditionalRule {
        fn process(&self, part: &Part) -> Option<RuleOutput> {
            match self.comparison {
                Compare::GreaterThan => match self.category {
                    Category::X => {
                        if part.x > self.target_value {
                            return Some(self.output.clone());
                        }
                    }
                    Category::M => {
                        if part.m > self.target_value {
                            return Some(self.output.clone());
                        }
                    }
                    Category::A => {
                        if part.a > self.target_value {
                            return Some(self.output.clone());
                        }
                    }
                    Category::S => {
                        if part.s > self.target_value {
                            return Some(self.output.clone());
                        }
                    }
                },
                Compare::LessThan => match self.category {
                    Category::X => {
                        if part.x < self.target_value {
                            return Some(self.output.clone());
                        }
                    }
                    Category::M => {
                        if part.m < self.target_value {
                            return Some(self.output.clone());
                        }
                    }
                    Category::A => {
                        if part.a < self.target_value {
                            return Some(self.output.clone());
                        }
                    }
                    Category::S => {
                        if part.s < self.target_value {
                            return Some(self.output.clone());
                        }
                    }
                },
            }
            None
        }
    }

    impl FromStr for ConditionalRule {
        type Err = ParseConditionalRuleError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let Some((condition, result)) = s.split_once(":") else {
                panic!("Bad conditional rule input string")
            };
            let output = match result {
                "A" => RuleOutput::Accept,
                "R" => RuleOutput::Reject,
                val => RuleOutput::Rule(val.to_string()),
            };

            let mut condition_iter = condition.chars();
            let category = match condition_iter.next().unwrap() {
                'x' => Category::X,
                'm' => Category::M,
                'a' => Category::A,
                's' => Category::S,
                _ => panic!("Invalid category in a conditional rule"),
            };

            let comparison = match condition_iter.next().unwrap() {
                '<' => Compare::LessThan,
                '>' => Compare::GreaterThan,
                _ => panic!("Invalid comparison character in a conditional rule"),
            };

            let target_value = condition
                .chars()
                .skip(2)
                .map(|c| c.to_string())
                .collect::<Vec<_>>()
                .join("")
                .parse::<usize>()
                .unwrap();

            Ok(ConditionalRule {
                target_value,
                category,
                output,
                comparison,
            })
        }
    }

    #[derive(Debug)]
    enum Instruction {
        Condition(ConditionalRule),
        Goto(String),
        Accept,
        Reject,
    }
    impl Instruction {
        fn process_instructions(
            instruction_set: &Vec<Instruction>,
            part: &Part,
        ) -> Option<RuleOutput> {
            for instruction in instruction_set {
                match instruction {
                    Instruction::Accept => return Some(RuleOutput::Accept),
                    Instruction::Reject => return Some(RuleOutput::Reject),
                    Instruction::Goto(val) => return Some(RuleOutput::Rule(val.to_string())),
                    Instruction::Condition(rule) => match rule.process(part) {
                        Some(RuleOutput::Accept) => return Some(RuleOutput::Accept),
                        Some(RuleOutput::Reject) => return Some(RuleOutput::Reject),
                        Some(RuleOutput::Rule(val)) => return Some(RuleOutput::Rule(val)),
                        None => continue,
                    },
                };
            }
            // the last item is alway returned
            None
        }
    }

    impl FromStr for Instruction {
        type Err = ParseInstructionError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let mut iter = s.chars();
            let first = iter.next().unwrap();

            if first == 'A' {
                return Ok(Self::Accept);
            } else if first == 'R' {
                return Ok(Self::Reject);
            }

            // if we contain : then its a full conditional rule
            if s.contains(":") {
                return Ok(Self::Condition(ConditionalRule::from_str(s).unwrap()));
            }

            // we just have a reference to another rule
            Ok(Self::Goto(s.to_string()))
        }
    }

    #[derive(Debug)]
    pub struct Machine {
        parts: Vec<Part>,
        instructions: HashMap<String, Vec<Instruction>>,
    }

    impl Machine {
        pub fn process(&self) -> usize {
            let mut result = 0;
            for part in &self.parts {
                if self.is_part_valid(&part) {
                    result += part.score();
                }
            }
            result
        }

        fn is_part_valid(&self, part: &Part) -> bool {
            let mut current_instruction_set = self.instructions.get("in").unwrap();
            loop {
                match Instruction::process_instructions(current_instruction_set, part).unwrap() {
                    RuleOutput::Accept => return true,
                    RuleOutput::Reject => return false,
                    RuleOutput::Rule(new_rule) => {
                        current_instruction_set = self.instructions.get(&new_rule).unwrap()
                    }
                };
            }
        }
    }

    impl FromStr for Machine {
        type Err = ParseMachineError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let mut sections = s.split("\n\n");
            let ints = sections.next().unwrap();
            let prts = sections.next().unwrap();

            let instructions = ints
                .split('\n')
                .map(|l| {
                    let mut first_split = l.split("{");
                    let name = first_split.next().unwrap();

                    let int_arr = first_split
                        .next()
                        .unwrap()
                        .to_string()
                        .trim_matches(|c| c == '}' || c == '{')
                        .split(',')
                        .map(|i| Instruction::from_str(i).unwrap())
                        .collect::<Vec<_>>();

                    (name.to_string(), int_arr)
                })
                .collect::<HashMap<_, _>>();

            let parts = prts
                .trim()
                .split("\n")
                .map(|l| Part::from_str(l).unwrap())
                .collect::<Vec<_>>();

            Ok(Self {
                instructions,
                parts,
            })
        }
    }
}
