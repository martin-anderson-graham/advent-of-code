mod day01;
mod day02;
mod day03;

pub fn run(day: &String, input: String){
    match day.as_str(){
        "1" => day01::day01::run(input),
        "2" => day02::day02::run(input),
        "3" => day03::day03::run(input),
        _ => (),
    };

}
