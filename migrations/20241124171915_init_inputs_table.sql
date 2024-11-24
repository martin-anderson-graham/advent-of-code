-- init table to hold downloaded inputs
CREATE TABLE IF NOT EXISTS inputs
(
    id      INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    year    TEXT NOT NULL,
    day     TEXT NOT NULL,
    body   TEXT NOT NULL,

    CONSTRAINT unique_day_year UNIQUE (day, year)
);
