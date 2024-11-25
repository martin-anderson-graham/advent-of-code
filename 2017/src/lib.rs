mod day01;

pub fn run(day: &String, input: String){
    match day.as_str(){
        "1" => day01::day01::run(input),
        _ => (),
    };

}
