use colorized::{Color, Colors};
use reqwest::{
    header::{HeaderMap, HeaderValue, COOKIE, USER_AGENT},
    Client, StatusCode,
};

use crate::puzzle::ValidYears;

pub struct AocHttpClient {}

impl AocHttpClient {
    fn get_client() -> Client {
        reqwest::Client::new()
    }

    fn get_headers() -> HeaderMap {
        let mut headers = HeaderMap::new();

        let session_cookie =
            HeaderValue::from_str(&format!("session={}", dotenv!("AOC_TOKEN"))).unwrap();
        headers.insert(COOKIE, session_cookie);
        headers.insert(
            USER_AGENT,
            HeaderValue::from_static("https://github.com/martin-anderson-graham/advent-of-code by martin.anderson.graham@gmail.com"),
        );
        headers
    }

    pub async fn fetch_puzzle_input(day: &String, year: &ValidYears) -> String {
        let client = AocHttpClient::get_client();

        let aoc_input_url = format!(
            "https://adventofcode.com/{}/day/{}/input",
            year,
            day
        );

        let resp = client
            .get(aoc_input_url)
            .headers(AocHttpClient::get_headers())
            .send()
            .await
            .unwrap_or_else(|_| {
                println!(
                    " -- error when connecting to AoC {}",
                    "aborting".color(Colors::RedFg)
                );
                std::process::exit(1);
            });

        match resp.status() {
            StatusCode::OK => println!(
                " -- {} successfully fetched input",
                "\u{2714}".color(Colors::GreenFg)
            ),
            _ => {
                println!(
                    " -- got a non-200 response code - {}",
                    resp.status().to_string().color(Colors::BlueFg)
                );
                println!(" -- message - {}", resp.text().await.unwrap(),);
                std::process::exit(1);
            }
        };

        match resp.text().await {
            Ok(t) => t,
            _ => {
                println!(
                    " -- error when parsing respose body {}",
                    "aborting".color(Colors::RedFg)
                );
                std::process::exit(1);
            }
        }
    }
}
