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
}
