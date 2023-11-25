pub mod rope {
    use std::collections::HashMap;

    #[derive(Debug)]
    struct Pos {
        x: isize,
        y: isize,
    }

    impl Pos {
        fn new() -> Pos {
            Pos { x: 0, y: 0 }
        }

        fn is_touching(&self, second: (isize, isize)) -> bool {
            let delta_x = (self.x - second.0).abs();
            let delta_y = (self.y - second.1).abs();
            delta_y <= 1 && delta_x <= 1
        }
        fn move_pos(&mut self, direction: (isize, isize)) -> (isize, isize) {
            self.x += direction.0;
            self.y += direction.1;
            (self.x, self.y)
        }

        fn update_pos(&mut self, prior_pos: (isize, isize)) -> (isize, isize) {
            // same position, no move
            if self.is_touching(prior_pos) {
                return (self.x, self.y);
            }

            if prior_pos.1 > self.y {
                self.y += 1;
            } else if prior_pos.1 < self.y{
                self.y -= 1;
            }

            if prior_pos.0 > self.x {
                self.x += 1;
            } else if prior_pos.0 < self.x{
                self.x -= 1;
            }
            (self.x, self.y)
        }
    }

    #[derive(Debug)]
    pub struct Rope {
        knots: Vec<Pos>,
        pub visited: HashMap<(isize, isize), bool>,
    }

    impl Rope {
        pub fn new(size: usize) -> Rope {
            let mut knots: Vec<Pos> = Vec::with_capacity(size);
            for _ in 0..size {
                knots.push(Pos::new())
            }
            Rope {
                knots,
                visited: HashMap::new(),
            }
        }
        pub fn move_head(&mut self, direction: (isize, isize), repeat: usize) {
            (0..repeat).for_each(|_| {
                let mut prior_pos: (isize, isize) = (0, 0);
                for (i, knot) in self.knots.iter_mut().enumerate() {
                    if i == 0 {
                        prior_pos = knot.move_pos(direction);
                    } else {
                        prior_pos = knot.update_pos(prior_pos);
                    }
                }
                self.visited.insert(prior_pos, true);
            })
        }

        pub fn get_visited_count(&self) -> usize {
            self.visited.len()
        }
    }
}
