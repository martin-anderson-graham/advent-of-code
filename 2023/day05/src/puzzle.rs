pub mod puzzle {
    use std::{num::ParseIntError, str::FromStr};

    #[derive(Debug)]
    struct Range {
        start_input: usize,
        end_input: usize,
        start_output: usize,
    }

    impl Range {
        fn new(start_input: usize, start_output: usize, length: usize) -> Self {
            Self {
                start_input,
                end_input: start_input + length - 1,
                start_output,
            }
        }

        fn get_output_from_range(&self, input: &usize) -> Option<usize> {
            if *input < self.start_input || *input > self.end_input {
                return None;
            }
            return Some(input + self.start_output - self.start_input);
        }

        fn get_output_from_ranges(input: usize, ranges: &Vec<Range>) -> usize {
            for range in ranges {
                if let Some(val) = &range.get_output_from_range(&input) {
                    // println!("{val}");
                    return *val;
                }
            }
            input
        }
    }

    impl FromStr for Range {
        type Err = ParseIntError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let mut s_iter = s.split(" ");
            let (start_output, start_input, length) = (
                s_iter.next().unwrap().parse().unwrap(),
                s_iter.next().unwrap().parse().unwrap(),
                s_iter.next().unwrap().parse().unwrap(),
            );
            Ok(Self::new(start_input, start_output, length))
        }
    }

    fn build_map_from_str(s: &str) -> Vec<Range> {
        s.lines()
            .skip(1)
            .map(|line| Range::from_str(line).unwrap())
            .collect()
    }

    #[derive(Debug)]
    pub struct Puzzle {
        min_seed: usize,
        seed_to_soil: Vec<Range>,
        soil_to_fertilizer: Vec<Range>,
        fertilizer_to_water: Vec<Range>,
        water_to_light: Vec<Range>,
        light_to_temperature: Vec<Range>,
        temperature_to_humidity: Vec<Range>,
        humidity_to_location: Vec<Range>,
    }

    impl Puzzle {
        fn process_seed(&mut self, seed: usize) {
            let soil = Range::get_output_from_ranges(seed, &self.seed_to_soil);
            let fertilizer = Range::get_output_from_ranges(soil, &self.soil_to_fertilizer);
            let water = Range::get_output_from_ranges(fertilizer, &self.fertilizer_to_water);
            let light = Range::get_output_from_ranges(water, &self.water_to_light);
            let temperature = Range::get_output_from_ranges(light, &self.light_to_temperature);
            let humidity =
                Range::get_output_from_ranges(temperature, &self.temperature_to_humidity);
            let location = Range::get_output_from_ranges(humidity, &self.humidity_to_location);

            if location < self.min_seed {
                self.min_seed = location;
            }
        }

        pub fn score(self) -> usize {
            self.min_seed
        }

        pub fn new(raw: &str, is_part_one: bool) -> Self {
            if is_part_one {
                let mut puzzle = Puzzle::from_str(&raw).unwrap();

                raw
                    .split("\n\n")
                    .next()
                    .unwrap()
                    .split(": ")
                    .nth(1)
                    .unwrap()
                    .split(" ")
                    .map(|seed| seed.parse::<usize>().unwrap())
                    .for_each(|seed| puzzle.process_seed(seed));

                puzzle
            } else {
                let mut puzzle = Puzzle::from_str(&raw).unwrap();

                raw.split("\n\n")
                    .next()
                    .unwrap()
                    .split(": ")
                    .nth(1)
                    .unwrap()
                    .split(" ")
                    .map(|s| s.parse::<usize>().unwrap())
                    .collect::<Vec<_>>()
                    .chunks(2)
                    .for_each(|chunk| {
                        let beginning = chunk.first().unwrap().clone();
                        let length = chunk.last().unwrap().clone();
                        for id in beginning..beginning + length {
                            puzzle.process_seed(id);
                        }
                    });

                puzzle
            }
        }
    }

    impl FromStr for Puzzle {
        type Err = ParseIntError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let mut chunks = s.split("\n\n").skip(1);

            let seed_to_soil: Vec<Range> = build_map_from_str(chunks.next().unwrap());
            let soil_to_fertilizer: Vec<Range> = build_map_from_str(chunks.next().unwrap());
            let fertilizer_to_water: Vec<Range> = build_map_from_str(chunks.next().unwrap());
            let water_to_light: Vec<Range> = build_map_from_str(chunks.next().unwrap());
            let light_to_temperature: Vec<Range> = build_map_from_str(chunks.next().unwrap());
            let temperature_to_humidity: Vec<Range> = build_map_from_str(chunks.next().unwrap());
            let humidity_to_location: Vec<Range> = build_map_from_str(chunks.next().unwrap());

            Ok(Self {
                min_seed: usize::max_value(),
                seed_to_soil,
                soil_to_fertilizer,
                fertilizer_to_water,
                water_to_light,
                light_to_temperature,
                temperature_to_humidity,
                humidity_to_location,
            })
        }
    }
}
