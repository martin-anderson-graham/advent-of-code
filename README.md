# advent-of-code
My Advent of Code solutions - https://adventofcode.com/

# aoc-test-runner
My cli written in rust for running AoC puzzles.

1. Run puzzles for a specific day/year
2. Downloads (with caching) puzzle inputs
3. Submit puzzle solutions

## Setup
Add the following to your `.env`
```
DATABASE_URL="sqlite:aoc.db"

# the year used if you don't specify the '--year' flag
DEFAULT_YEAR=2024
```

initialize the local db with (sqlx must be installed)
```
sqlx database setup
```

## Running
```
cargo run -- -day=12 -year=2024
```

`-year` can be ommitted if using the default year specified in `.env`
