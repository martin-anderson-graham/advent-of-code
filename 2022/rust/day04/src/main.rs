use std::str::FromStr;

#[derive(Debug, Clone, Copy)]
struct Elf {
    start: u32,
    end: u32,
}

impl FromStr for Elf {
    type Err = color_eyre::Report;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut chars = s.split("-");
        let(Some(start_string), Some(end_string), None) = (chars.next(), chars.next(), chars.next()) else {
            return Err(color_eyre::eyre::eyre!("expected <first>-<second>EOF, got {s:?}"))
        };
        let(Ok(start), Ok(end)) = (start_string.parse::<u32>(), end_string.parse::<u32>()) else {
            return Err(color_eyre::eyre::eyre!("Found a string I could not parse {start_string:?} - {end_string:?}"))
        };
        Ok(Self { start, end })
    }
}

impl Elf {
    fn contains_other(&self, other: &Elf) -> bool {
        self.start <= other.start && self.end >= other.end
    }
}

#[derive(Debug, Clone, Copy)]
struct Pair {
    first: Elf,
    second: Elf,
}

impl FromStr for Pair {
    type Err = color_eyre::Report;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut parts = s.split(",");
        let(Some(first_str), Some(second_str), None) = (parts.next(), parts.next(), parts.next()) else {
            return Err(color_eyre::eyre::eyre!("Couldn't parse pair {s:?}"))
        };
        let(Ok(first), Ok(second)) = (first_str.parse::<Elf>(), second_str.parse::<Elf>())  else {
            return Err(color_eyre::eyre::eyre!("Failed parsing as an elf {first_str:?} {second_str:?}"))
        };
        Ok(Self { first, second })
    }
}

impl Pair {
    fn overlap_exists(&self) -> bool {
        self.first.contains_other(&self.second) || self.second.contains_other(&self.first)
    }

    fn overlap_at_all(&self) -> bool {
        self.first.end >= self.second.start && self.first.start <= self.second.end
    }
}

fn main() -> Result<(), color_eyre::Report> {
    color_eyre::install()?;
    let ex1 = include_str!("../ex1.txt");
    let input = include_str!("../input.txt");
    assert_eq!(part_one(ex1).unwrap(), 2);
    assert_eq!(part_one(input).unwrap(), 413);
    assert_eq!(part_two(ex1).unwrap(), 4);
    assert_eq!(part_two(input).unwrap(), 806);
    Ok(())
}

fn part_one(raw: &str) -> Result<usize, color_eyre::Report> {
    Ok(raw
        .lines()
        .map(Pair::from_str)
        .collect::<Result<Vec<Pair>, _>>()?
        .iter()
        .filter(|pair| (*pair).overlap_exists())
        .count())
}

fn part_two(raw: &str) -> Result<usize, color_eyre::Report> {
    Ok(raw
        .lines()
        .map(Pair::from_str)
        .collect::<Result<Vec<Pair>, _>>()?
        .iter()
        .filter(|pair| (*pair).overlap_at_all())
        .count())
}
