use std::str::FromStr;

#[derive(Debug, Clone, Copy)]
enum Outcome {
    Loss,
    Draw,
    Win,
}

impl Outcome {
    fn get_points(&self) -> usize {
        match self {
            Outcome::Loss => 0,
            Outcome::Draw => 3,
            Outcome::Win => 6,
        }
    }
}

#[derive(Debug, Clone, Copy)]
struct Round {
    ours: Move,
    result: Outcome,
}

impl Round {
    fn score_round(&self) -> usize {
        self.ours.get_points() + self.result.get_points()
    }
}

impl FromStr for Round {
    type Err = color_eyre::Report;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut chars = s.chars();
        let (Some(theirs), Some(' '), Some(ours), None) = (chars.next(), chars.next(), chars.next(), chars.next()) else {
            return Err(color_eyre::eyre::eyre!("expected <theirs>space<ours>EOF, got {s:?}"));
        };
        let theirs: Move = Move::try_from(theirs)?;
        let outcome: Outcome = match ours {
            'X' => Ok(Outcome::Loss),
            'Y' => Ok(Outcome::Draw),
            'Z' => Ok(Outcome::Win),
            _ => Err(color_eyre::eyre::eyre!("Can't read game result, got {s:?}")),
        }?;

        let ours = Move::find_missing_move(&theirs, &outcome);

        Ok(Self {
            result: outcome,
            ours,
        })
    }
}

#[derive(Debug, Clone, Copy)]
enum Move {
    Rock,
    Paper,
    Scissors,
}

impl TryFrom<char> for Move {
    type Error = color_eyre::Report;
    fn try_from(c: char) -> Result<Self, Self::Error> {
        match c {
            'A' => Ok(Move::Rock),
            'B' => Ok(Move::Paper),
            'C' => Ok(Move::Scissors),
            _ => Err(color_eyre::eyre::eyre!("not a valid move: {c:?}")),
        }
    }
}

impl Move {
    fn find_missing_move(theirs: &Move, outcome: &Outcome) -> Self {
        match outcome {
            Outcome::Win => match theirs {
                Move::Rock => Move::Paper,
                Move::Paper => Move::Scissors,
                Move::Scissors => Move::Rock,
            },
            Outcome::Draw => *theirs,
            Outcome::Loss => match theirs {
                Move::Rock => Move::Scissors,
                Move::Paper => Move::Rock,
                Move::Scissors => Move::Paper,
            },
        }
    }

    fn get_points(&self) -> usize {
        match self {
            Move::Rock => 1,
            Move::Paper => 2,
            Move::Scissors => 3,
        }
    }
}

fn main() -> color_eyre::Result<()> {
    color_eyre::install()?;

    let mut sum: usize = 0;
    for round in include_str!("../input.txt")
        .lines()
        .map(|line| line.parse::<Round>())
    {
        let round = round?;
        sum += round.score_round();
    }
    println!("{sum}");
    Ok(())
}
