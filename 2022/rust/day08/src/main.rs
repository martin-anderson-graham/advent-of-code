use std::str::FromStr;

#[derive(Debug, PartialEq, Eq)]
struct ParsePointError;

struct Grid(Vec<Vec<usize>>);

impl FromStr for Grid {
    type Err = ParsePointError;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let result = s
            .lines()
            .map(|l| {
                l.chars()
                    .map(|v| v.to_digit(10).unwrap() as usize)
                    .collect()
            })
            .collect();
        Ok(Grid(result))
    }
}

fn get_tree_view_distance(row: Vec<usize>, self_val: usize) -> usize {
    let mut result = 0;
    for (index, val) in row.iter().enumerate() {
        if val >= &self_val {
            result = index;
            break;
        }
        result = index;
    }
    result + 1
}

impl Grid {
    fn get_trees_left(&self, x: usize, y: usize) -> Vec<usize> {
        self.0[y][0..x].to_vec()
    }
    fn get_trees_right(&self, x: usize, y: usize) -> Vec<usize> {
        self.0[y][x + 1..].to_vec()
    }
    fn get_trees_up(&self, x: usize, y: usize) -> Vec<usize> {
        (0..y).map(|y_val| self.0[y_val][x]).collect()
    }
    fn get_trees_down(&self, x: usize, y: usize) -> Vec<usize> {
        (y + 1..self.0.len())
            .map(|y_val| self.0[y_val][x])
            .collect()
    }
    fn tree_is_visible(&self, x: usize, y: usize) -> bool {
        if x == 0 || y == 0 || x == self.0[y].len() - 1 || y == self.0.len() - 1 {
            return true;
        }
        let tree_val = self.0[y][x];
        let mut result = false;
        // check left
        if self.get_trees_left(x, y).iter().all(|val| val < &tree_val) {
            result = true;
        }
        // check right
        if self.get_trees_right(x, y).iter().all(|val| val < &tree_val) {
            result = true;
        }
        // check up
        if self.get_trees_up(x, y).iter().all(|val| val < &tree_val) {
            result = true;
        }
        // check down
        if self.get_trees_down(x, y).iter().all(|val| val < &tree_val) {
            result = true;
        }
        result
    }

    fn get_tree_scenic_score(&self, x: usize, y: usize) -> usize {
        let tree_val = self.0[y][x];
        let left = get_tree_view_distance(
            self.get_trees_left(x, y).iter().rev().cloned().collect(),
            tree_val,
        );
        let right = get_tree_view_distance(self.get_trees_right(x, y), tree_val);
        let up = get_tree_view_distance(
            self.get_trees_up(x, y).iter().rev().cloned().collect(),
            tree_val,
        );
        let down = get_tree_view_distance(self.get_trees_down(x, y), tree_val);

        return left * right * up * down;
    }

    fn count_visible_trees(&self) -> usize {
        let mut count: usize = 0;
        for (y, row) in self.0.iter().enumerate() {
            for (x, _) in row.iter().enumerate() {
                if self.tree_is_visible(x, y) {
                    count += 1;
                }
            }
        }
        count
    }
}

fn main() {
    let ex1 = include_str!("./ex1.txt");
    let input = include_str!("./input.txt");

    assert_eq!(part_one(ex1), 21);
    assert_eq!(part_one(input), 1798);
    // test(ex1);
    assert_eq!(part_two(ex1), 8);
    assert_eq!(part_two(input), 259308);
}

fn part_one(raw: &str) -> usize {
    let grid = Grid::from_str(raw).unwrap();
    grid.count_visible_trees()
}

fn part_two(raw: &str) -> usize {
    let grid = Grid::from_str(raw).unwrap();
    let mut scores: Vec<Vec<usize>> = Vec::new();

    grid.0.iter().enumerate().for_each(|(y, row)| {
        scores.push(vec![]);
        row.iter().enumerate().for_each(|(x, _)| {
            if x == 0 || y == 0 || x == grid.0[y].len() - 1 || y == grid.0.len() - 1 {
                scores[y].push(0);
            } else {
                scores[y].push(grid.get_tree_scenic_score(x, y));
            }
        })
    });
    // scores
    //     .iter()
    //     .for_each(|score_row| println!("{:?}", score_row));
    *scores.iter().flatten().max().unwrap()
}
