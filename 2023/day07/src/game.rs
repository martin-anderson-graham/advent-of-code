pub mod game {
    use std::{collections::HashMap, str::FromStr};

    #[derive(Debug, PartialEq, Eq)]
    struct ParseCardError;

    #[derive(Debug, PartialEq, Eq)]
    pub struct ParseHandError;

    #[derive(Debug)]
    #[repr(usize)]
    enum HandType {
        FiveOfAKind = 6,
        FourOfAKind = 5,
        FullHouse = 4,
        ThreeOfAKind = 3,
        TwoPair = 2,
        OnePair = 1,
        HighCard = 0,
    }

    #[derive(Clone, Hash, PartialEq, Eq, Copy, Debug, PartialOrd, Ord)]
    #[repr(usize)]
    enum Card {
        Ace = 14,
        King = 13,
        Queen = 12,
        Jack = 11,
        Ten = 10,
        Nine = 9,
        Eight = 8,
        Seven = 7,
        Six = 6,
        Five = 5,
        Four = 4,
        Three = 3,
        Two = 2,
    }

    impl FromStr for Card {
        type Err = ParseCardError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            match s {
                "A" => Ok(Card::Ace),
                "K" => Ok(Card::King),
                "Q" => Ok(Card::Queen),
                "J" => Ok(Card::Jack),
                "T" => Ok(Card::Ten),
                "9" => Ok(Card::Nine),
                "8" => Ok(Card::Eight),
                "7" => Ok(Card::Seven),
                "6" => Ok(Card::Six),
                "5" => Ok(Card::Five),
                "4" => Ok(Card::Four),
                "3" => Ok(Card::Three),
                "2" => Ok(Card::Two),
                _ => Err(ParseCardError),
            }
        }
    }

    #[derive(Clone, Debug, PartialEq, Eq, Ord)]
    pub struct Hand {
        cards: Vec<Card>,
        bid: usize,
        score: usize,
        jokers_wild: bool,
    }

    impl PartialOrd for Hand {
        fn partial_cmp(&self, other: &Self) -> Option<std::cmp::Ordering> {
            match self.score == other.score {
                true => {
                    for (index, card) in self.cards.iter().enumerate() {
                        let other_card = other.cards.get(index).unwrap();
                        let mut other_val = *other_card as usize;
                        if other_val == 11 && self.jokers_wild {
                            other_val = 1
                        }
                        let mut self_val = *card as usize;
                        if self_val == 11 && self.jokers_wild {
                            self_val = 1
                        }
                        if self_val != other_val {
                            return Some(self_val.cmp(&other_val));
                        }
                    }
                    Some(std::cmp::Ordering::Equal)
                }
                false => Some(self.score.cmp(&other.score)),
            }
        }
    }

    impl FromStr for Hand {
        type Err = ParseHandError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let (raw_hand, raw_bid) = s.split_once(" ").unwrap();
            Ok(Self {
                cards: raw_hand
                    .chars()
                    .map(|raw| Card::from_str(&raw.to_string()).unwrap())
                    .collect(),
                bid: raw_bid.parse::<usize>().unwrap(),
                score: 0,
                jokers_wild: false,
            })
        }
    }

    impl Hand {
        pub fn new(raw: &str, is_part_one: bool) -> Self {
            let mut hand = Hand::from_str(raw).unwrap();
            hand.jokers_wild = !is_part_one;
            hand
        }
        fn get_hand_type(&self, is_part_one: bool) -> HandType {
            let mut card_counts: HashMap<Card, usize> = HashMap::new();
            for card in &self.cards {
                *card_counts.entry(*card).or_insert(0) += 1;
            }
            if is_part_one {
                return match card_counts.len() {
                    1 => HandType::FiveOfAKind,
                    2 => match card_counts.values().any(|v| *v == 1) {
                        true => HandType::FourOfAKind,
                        false => HandType::FullHouse,
                    },
                    3 => match card_counts.values().any(|v| *v == 3) {
                        true => HandType::ThreeOfAKind,
                        false => HandType::TwoPair,
                    },
                    4 => HandType::OnePair,
                    5 => HandType::HighCard,
                    _ => panic!("Got a hand with more than five cards"),
                };
            };

            return match card_counts.len() {
                1 => HandType::FiveOfAKind,
                2 => match card_counts.values().any(|v| *v == 1) {
                    true => match card_counts.get(&Card::Jack).unwrap_or_else(|| &0) {
                        1 => HandType::FiveOfAKind,
                        4 => HandType::FiveOfAKind,
                        _ => HandType::FourOfAKind,
                    },
                    false => match card_counts.get(&Card::Jack).unwrap_or_else(|| &0) {
                        3 => HandType::FiveOfAKind,
                        2 => HandType::FiveOfAKind,
                        _ => HandType::FullHouse,
                    },
                },
                3 => match card_counts.values().any(|v| *v == 3) {
                    true => match card_counts.get(&Card::Jack).unwrap_or_else(|| &0) {
                        3 => HandType::FourOfAKind,
                        1 => HandType::FourOfAKind,
                        _ => HandType::ThreeOfAKind,
                    },
                    false => match card_counts.get(&Card::Jack).unwrap_or_else(|| &0) {
                        2 => HandType::FourOfAKind,
                        1 => HandType::FullHouse,
                        _ => HandType::TwoPair,
                    },
                },
                4 => match card_counts.get(&Card::Jack).unwrap_or_else(|| &0) {
                    2 => HandType::ThreeOfAKind,
                    1 => HandType::ThreeOfAKind,
                    _ => HandType::OnePair,
                },
                5 => match card_counts.get(&Card::Jack).unwrap_or_else(|| &0) {
                    1 => HandType::OnePair,
                    _ => HandType::HighCard,
                },
                _ => panic!("Got a hand with more than five cards"),
            };
        }

        fn score_hand(&mut self, is_part_one: bool) {
            self.score = self.get_hand_type(is_part_one) as usize;
        }

        pub fn score_hands(hands: &Vec<Hand>, is_part_one: bool) -> usize {
            let mut clone_hands: Vec<Hand> = hands.to_vec();
            clone_hands
                .iter_mut()
                .for_each(|h| h.score_hand(is_part_one));
            clone_hands.sort();
            for hand in &clone_hands {
                println!("{:?}", hand);
            }
            clone_hands
                .iter()
                .enumerate()
                .map(|(index, h)| h.bid * (index + 1))
                .sum()
        }
    }
}
