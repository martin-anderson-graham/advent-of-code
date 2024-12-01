-- init table to hold answers
CREATE TABLE IF NOT EXISTS answers
(
    id      INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    year    TEXT NOT NULL,
    day     TEXT NOT NULL,
    part    TEXT NOT NULL CHECK (part IN ('one', 'two')),
    answer  TEXT NOT NULL,

    CONSTRAINT unique_day_year_part_answer UNIQUE (day, year, part, answer)
);
