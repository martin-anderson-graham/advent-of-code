use colorized::{Color, Colors};
use sqlx::{Pool, Sqlite};

#[derive(Debug)]
pub struct PuzzleInputRow {
    #[allow(dead_code)]
    id: i64,
    #[allow(dead_code)]
    day: String,
    #[allow(dead_code)]
    year: String,
    pub body: String,
}

impl PuzzleInputRow {
    pub async fn get(
        day: &String,
        year: &String,
        pool: &Pool<Sqlite>,
    ) -> Result<PuzzleInputRow, ()> {
        match sqlx::query_as!(
            PuzzleInputRow,
            "SELECT * FROM inputs WHERE day = ? AND year = ? LIMIT 1",
            day,
            year
        )
        .fetch_one(pool)
        .await
        {
            Ok(row) => {
                println!(
                    " -- {} found input locally",
                    "\u{2714}".color(Colors::GreenFg)
                );
                Ok(row)
            }
            _ => Err(()),
        }
    }

    pub async fn upsert_puzzle_input(
        day: &String,
        year: &String,
        body: &String,
        pool: &Pool<Sqlite>,
    ) {
        match sqlx::query!(
            "
        INSERT INTO inputs (day, year, body)
        VALUES (?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            day = excluded.day,
            year = excluded.year,
            body = excluded.body
        ",
            day,
            year,
            body,
        )
        .execute(pool)
        .await
        {
            Ok(_) => {
                println!(
                    " -- {} successfully stored input",
                    "\u{2714}".color(Colors::GreenFg)
                );
            }
            _ => {
                println!(
                    " -- {} failed to stored input",
                    "\u{2714}".color(Colors::RedFg)
                );
            }
        }
    }
}
