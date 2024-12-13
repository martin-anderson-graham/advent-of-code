pub mod day12;

#[cfg(test)]
mod tests {
    use common::PuzzleParts;

    use crate::day12::day12::Day12;

    #[test]
    fn part_1() {
        let input = String::from(
            "RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE",
        );
        let mut puzz = Day12::new(&input);
        assert_eq!(puzz.part_one(), "1930");
    }

    #[test]
    fn part_2a() {
        let input = String::from(
            "AAAA
BBCD
BBCC
EEEC",
        );
        let mut puzz = Day12::new(&input);
        assert_eq!(puzz.part_two(), Some(String::from("80")));
    }

    #[test]
    fn part_2b() {
        let input = String::from(
            "RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE",
        );
        let mut puzz = Day12::new(&input);
        assert_eq!(puzz.part_two(), Some(String::from("1206")));
    }

    #[test]
    fn part_2c() {
        let input = String::from(
            "OOOOO
OXOXO
OOOOO
OXOXO
OOOOO",
        );
        let mut puzz = Day12::new(&input);
        assert_eq!(puzz.part_two(), Some(String::from("436")));
    }
}
