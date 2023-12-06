pub mod puzzle {
    use std::{num::ParseIntError, str::FromStr};

    #[derive(Debug)]
    struct Range {
        start_input: usize,
        end_input: usize,
        start_output: usize,
        end_output: usize,
    }

    impl Range {
        fn new(start_input: usize, start_output: usize, length: usize) -> Self {
            Self {
                start_input,
                end_input: start_input + length - 1,
                start_output,
                end_output: start_output + length - 1,
            }
        }
        fn get_input_from_range(output: usize, ranges: &Vec<Range>) -> Option<usize> {
            for range in ranges {
                if Range::output_in_range(output, range) {
                    return Some(output + range.start_input - range.start_output);
                }
            }
            // just return the output, except if its in the input range,
            // which is an anomalous result
            for range in ranges {
                if Range::input_in_range(output, range) {
                    return None;
                }
            }
            return Some(output);
        }

        fn input_in_range(input: usize, range: &Range) -> bool {
            input >= range.start_input && input <= range.start_output
        }

        fn output_in_range(output: usize, range: &Range) -> bool {
            output >= range.start_output && output <= range.end_output
        }

        fn outputs_contain(output: usize, ranges: &Vec<Range>) -> bool {
            for range in ranges {
                if Range::output_in_range(output, &range) {
                    return true;
                }
            }
            false
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
        seed_ranges: Vec<Range>,
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

        fn get_seed_from_location(&self, loc: usize) -> Option<usize> {
            let Some(humidity) = Range::get_input_from_range(loc, &self.humidity_to_location)
            else {
                return None;
            };
            let Some(temperature) =
                Range::get_input_from_range(humidity, &self.temperature_to_humidity)
            else {
                return None;
            };
            let Some(light) = Range::get_input_from_range(temperature, &self.light_to_temperature)
            else {
                return None;
            };
            let Some(water) = Range::get_input_from_range(light, &self.water_to_light) else {
                return None;
            };
            let Some(fertilizer) = Range::get_input_from_range(water, &self.fertilizer_to_water)
            else {
                return None;
            };
            let Some(soil) = Range::get_input_from_range(fertilizer, &self.soil_to_fertilizer)
            else {
                return None;
            };
            let Some(seed) = Range::get_input_from_range(soil, &self.seed_to_soil) else {
                return None;
            };

            Some(seed)
        }

        pub fn score(&self, is_part_one: bool) -> usize {
            if is_part_one {
                return self.min_seed;
            }

            for temp_loc in 0..=self.humidity_to_location.last().unwrap().end_output {
                let Some(temp_seed) = self.get_seed_from_location(temp_loc) else {
                    continue;
                };
                if Range::outputs_contain(temp_seed, &self.seed_ranges) {
                    return temp_loc;
                }
            }
            3
        }

        pub fn new(raw: &str, is_part_one: bool) -> Self {
            if is_part_one {
                let mut puzzle = Puzzle::from_str(&raw).unwrap();

                raw.split("\n\n")
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
                let puzzle = Puzzle::from_str(&raw).unwrap();
                puzzle
            }
        }
    }

    impl FromStr for Puzzle {
        type Err = ParseIntError;
        fn from_str(s: &str) -> Result<Self, Self::Err> {
            let mut chunks = s.split("\n\n").skip(1);

            let mut seeds = s
                .split("\n\n")
                .next()
                .unwrap()
                .split(": ")
                .nth(1)
                .unwrap()
                .split(" ")
                .map(|s| s.parse::<usize>().unwrap())
                .collect::<Vec<_>>()
                .chunks(2)
                .map(|chunk| {
                    let beginning = chunk.first().unwrap().clone();
                    let length = chunk.last().unwrap().clone();
                    Range::new(beginning, beginning, length)
                })
                .collect::<Vec<_>>();

            seeds.sort_by(|a, b| a.start_input.cmp(&b.start_input));

            let seed_to_soil: Vec<Range> = build_map_from_str(chunks.next().unwrap());
            let soil_to_fertilizer: Vec<Range> = build_map_from_str(chunks.next().unwrap());
            let fertilizer_to_water: Vec<Range> = build_map_from_str(chunks.next().unwrap());
            let water_to_light: Vec<Range> = build_map_from_str(chunks.next().unwrap());
            let light_to_temperature: Vec<Range> = build_map_from_str(chunks.next().unwrap());
            let temperature_to_humidity: Vec<Range> = build_map_from_str(chunks.next().unwrap());
            let mut humidity_to_location: Vec<Range> = build_map_from_str(chunks.next().unwrap());

            humidity_to_location.sort_by(|a, b| a.start_output.cmp(&b.end_output));

            Ok(Self {
                min_seed: usize::max_value(),
                seed_ranges: seeds,
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
