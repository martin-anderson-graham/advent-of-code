use std::collections::HashMap;

pub fn run(input: String) {
    let p_one = part_one(&input);
    println!(" -- part 1 - {}", p_one);
    let p_two = part_two(&input);
    println!(" -- part 2 - {}", p_two);
}

#[derive(Debug)]
struct Ring {
    i: isize,
    corners: Vec<isize>,
}

impl Ring {
    fn new(i: isize) -> Self {
        let side_length = 2 * i + 1;
        let fourth = (2 * i + 1) * (2 * i + 1);
        let third = fourth - (side_length - 1);
        let second = third - (side_length - 1);
        let first = second - (side_length - 1);
        Self {
            i,
            corners: vec![first, second, third, fourth],
        }
    }
}

fn parse(input: &String) -> isize {
    input.trim().parse::<isize>().unwrap()
}

pub fn part_one(input: &String) -> isize {
    let target = parse(input);
    let mut i = 0;
    loop {
        let r = Ring::new(i);
        // not the correct ring
        if target > r.corners[3] {
            i += 1;
            continue;
        }
        let distance_from_corner = r
            .corners
            .iter()
            .map(|corner| (target - *corner).abs())
            .min()
            .unwrap();
        return 2 * i - distance_from_corner;
    }
}

#[derive(Eq, Hash, PartialEq, Clone)]
struct Coordinates {
    x: isize,
    y: isize,
}

impl Coordinates {
    fn new(x: isize, y: isize) -> Self {
        Self { x, y }
    }
}

struct Board {
    current_ring: isize,
    points: HashMap<Coordinates, usize>,
    last_point: Coordinates,
}

impl Board {
    fn get_new_value(&self, coordinates: &Coordinates) -> usize {
        let mut result = 0;

        if let Some(val) = self
            .points
            .get(&Coordinates::new(coordinates.x - 1, coordinates.y))
        {
            result += val;
        }
        if let Some(val) = self
            .points
            .get(&Coordinates::new(coordinates.x + 1, coordinates.y))
        {
            result += val;
        }
        if let Some(val) = self
            .points
            .get(&Coordinates::new(coordinates.x, coordinates.y + 1))
        {
            result += val;
        }
        if let Some(val) = self
            .points
            .get(&Coordinates::new(coordinates.x, coordinates.y - 1))
        {
            result += val;
        }
        if let Some(val) = self
            .points
            .get(&Coordinates::new(coordinates.x-1, coordinates.y - 1))
        {
            result += val;
        }
        if let Some(val) = self
            .points
            .get(&Coordinates::new(coordinates.x+1, coordinates.y + 1))
        {
            result += val;
        }
        if let Some(val) = self
            .points
            .get(&Coordinates::new(coordinates.x+1, coordinates.y - 1))
        {
            result += val;
        }
        if let Some(val) = self
            .points
            .get(&Coordinates::new(coordinates.x-1, coordinates.y + 1))
        {
            result += val;
        }

        result
    }
}

pub fn part_two(input: &String) -> usize {
    let mut board = Board {
        current_ring: 0,
        points: HashMap::new(),
        last_point: Coordinates::new(0, 0),
    };
    board.points.insert(Coordinates::new(0, 0), 1);
    let target = input.trim().parse::<usize>().unwrap();

    loop {
        board.current_ring += 1;

        // go right 1
        let point_to_right = Coordinates::new(board.last_point.x + 1, board.last_point.y);
        let new_value = board.get_new_value(&point_to_right);
        board.points.insert(point_to_right.clone(), new_value);
        board.last_point = point_to_right;
        if new_value > target {
            return new_value;
        }

        // go up 2 * ring - 1
        for _ in 0..(2 * board.current_ring - 1) {
            let point_to_up = Coordinates::new(board.last_point.x, board.last_point.y + 1);
            let new_value = board.get_new_value(&point_to_up);
            board.points.insert(point_to_up.clone(), new_value);
            board.last_point = point_to_up;

            if new_value > target {
                return new_value;
            }
        }
        // go left  2 * ring
        for _ in 0..(2 * board.current_ring) {
            let point_to_left = Coordinates::new(board.last_point.x - 1, board.last_point.y);
            let new_value = board.get_new_value(&point_to_left);
            board.points.insert(point_to_left.clone(), new_value);
            board.last_point = point_to_left;

            if new_value > target {
                return new_value;
            }
        }
        // go down   2 * ring
        for _ in 0..(2 * board.current_ring) {
            let point_to_down = Coordinates::new(board.last_point.x, board.last_point.y - 1);
            let new_value = board.get_new_value(&point_to_down);
            board.points.insert(point_to_down.clone(), new_value);
            board.last_point = point_to_down;

            if new_value > target {
                return new_value;
            }
        }
        // go right  2 * ring
        for _ in 0..(2 * board.current_ring) {
            let point_to_right = Coordinates::new(board.last_point.x + 1, board.last_point.y);
            let new_value = board.get_new_value(&point_to_right);
            board.points.insert(point_to_right.clone(), new_value);
            board.last_point = point_to_right;

            if new_value > target {
                return new_value;
            }
        }
    }
}
