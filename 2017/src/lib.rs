mod day01;
mod day02;

pub fn run(day: &String, input: String){
    match day.as_str(){
        "1" => day01::day01::run(input),
        "2" => day02::day02::run(input),
        _ => (),
    };

}
