use std::fmt::Display;

use colorized::{Color, Colors};
use sqlx::{Pool, Sqlite};

use crate::puzzle::ValidYears;

#[derive(Debug)]
pub enum Parts {
    One,
    Two,
}

impl Display for Parts {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                Parts::One => "one",
                Parts::Two => "two",
            }
        )
    }
}

impl Into<String> for Parts {
    fn into(self) -> String {
        match self {
            Parts::One => "one".to_string(),
            Parts::Two => "two".to_string(),
        }
    }
}

impl Into<Parts> for String {
    fn into(self) -> Parts {
        if self == "one".to_string() {
            return Parts::One;
        } else if self == "two".to_string() {
            return Parts::Two;
        } else {
            panic!("Got an invalid string from the db for answers.parts, only 'one' or 'two' allowed - {}",self)
        }
    }
}

// TODO: after auto-submitting is added we can
// add incorrect, as well as two high/low
pub enum AnswerState {
    New,
    Exists,
}

impl Display for AnswerState {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}",
            match self {
                AnswerState::New => "new".color(Colors::GreenFg),
                AnswerState::Exists => "exists".color(Colors::WhiteFg),
            }
        )
    }
}

#[derive(Debug)]
pub struct PuzzleAnswerRow {
    #[allow(dead_code)]
    id: i64,
    #[allow(dead_code)]
    day: String,
    #[allow(dead_code)]
    year: String,
    #[allow(dead_code)]
    part: Parts,
    pub answer: String,
}

impl PuzzleAnswerRow {
    async fn get_matched_puzzles(
        day: &String,
        year: &ValidYears,
        pool: &Pool<Sqlite>,
        part: Parts,
    ) -> Result<Vec<PuzzleAnswerRow>, ()> {
        let year_str = year.to_string();
        let part_str = part.to_string();

        match sqlx::query_as!(
            PuzzleAnswerRow,
            "SELECT * FROM answers WHERE day = ? AND year = ? AND part = ?",
            day,
            year_str,
            part_str,
        )
        .fetch_all(pool)
        .await
        {
            Ok(answers) => Ok(answers),
            _ => Err(()),
        }
    }

    pub async fn get_answer_state(
        day: &String,
        year: &ValidYears,
        pool: &Pool<Sqlite>,
        part: Parts,
        answer: &String,
    ) -> AnswerState {
        let answer_rows = PuzzleAnswerRow::get_matched_puzzles(day, year, pool, part).await;

        let answers = match answer_rows {
            Ok(a) => a,
            Err(_) => return AnswerState::New,
        };

        if answers.iter().find(|p| p.answer == *answer).is_some() {
            return AnswerState::Exists;
        }

        AnswerState::New
    }

    pub async fn store_answer(
        day: &String,
        year: &ValidYears,
        pool: &Pool<Sqlite>,
        part: Parts,
        answer: &String,
    ) {
        let year_str = year.to_string();
        let part_str = part.to_string();
        let _ = sqlx::query!(
            "
        INSERT INTO answers (day, year, part, answer)
        VALUES (?, ?, ?, ?)",
            day,
            year_str,
            part_str,
            answer,
        )
        .execute(pool)
        .await;
    }
}
