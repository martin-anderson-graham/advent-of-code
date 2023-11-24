use std::{cell::RefCell, rc::Rc};

// #[derive(Debug, Clone)]
// struct File {
//     size: usize,
//     name: String,
// }

#[derive(Debug, Clone)]
enum DirChild {
    File(usize),
    Dir(Rc<RefCell<Dir>>),
}

#[derive(Debug, Clone)]
struct Dir {
    size: usize,
    name: String,
    parent_dir: Option<Rc<RefCell<Dir>>>,
    children: RefCell<Vec<DirChild>>,
}

fn calc_dir_size(dir: Rc<RefCell<Dir>>) -> usize {
    let mut size: usize = 0;
    for child in dir.borrow().children.borrow().iter() {
        size += match child {
            DirChild::File(val) => *val,
            DirChild::Dir(child_dir) => calc_dir_size(child_dir.clone()),
        }
    }
    dir.borrow_mut().size = size;
    size
}

fn add_child_dir(current_dir: &Rc<RefCell<Dir>>, child_name: String) {
    let new_child = Rc::new(RefCell::new(Dir {
        name: child_name,
        size: 0,
        children: RefCell::new(vec![]),
        parent_dir: Some(current_dir.clone()),
    }));
    current_dir
        .borrow()
        .children
        .borrow_mut()
        .push(DirChild::Dir(new_child));
}

fn main() {
    let ex1 = include_str!("./ex1.txt");
    let input = include_str!("./input.txt");
    assert_eq!(part_one(ex1), 95437);
    assert_eq!(part_one(input), 1648397);
    assert_eq!(part_two(ex1), 24933642);
    assert_eq!(part_two(input), 1815525);
}

fn part_one(raw: &str) -> usize {
    let root = build_tree(raw);
    calc_dir_size(root.clone());
    count_size_lte_100000(root)
}

fn part_two(raw: &str) -> usize {
    let root = build_tree(raw);
    calc_dir_size(root.clone());
    let target = 30000000 - (70000000 - root.borrow().size);
    let mut all: Vec<usize> = vec![];
    walk_and_get_sizes(root, &mut all);
    let mut best = 70000000;
    for val in all.iter() {
        if val < &best && val > &target {
            best = *val;
        }
    }
    best
}

fn walk_and_get_sizes(dir: Rc<RefCell<Dir>>, all: &mut Vec<usize>) {
    all.push(dir.borrow().size);
    for child in dir.borrow().children.borrow().iter() {
        match child {
            DirChild::Dir(dir_child) => walk_and_get_sizes(dir_child.clone(), all),
            DirChild::File(_) => (),
        };
    }
}

fn count_size_lte_100000(dir: Rc<RefCell<Dir>>) -> usize {
    let mut result = 0;
    if dir.borrow().size <= 100000 {
        result += dir.borrow().size;
    }
    for child in dir.borrow().children.borrow().iter() {
        result += match child {
            DirChild::Dir(dir_child) => count_size_lte_100000(dir_child.clone()),
            DirChild::File(_) => 0,
        }
    }
    result
}

fn build_tree(raw: &str) -> Rc<RefCell<Dir>> {
    let raw_lines = raw.lines();

    let root_dir = Rc::new(RefCell::new(Dir {
        size: 0,
        children: RefCell::new(vec![]),
        name: "/".to_string(),
        parent_dir: None,
    }));

    let mut current_dir = root_dir.clone();

    for line in raw_lines {
        if line.starts_with("$") {
            if line == "$ ls" {
                continue;
            } else if line.starts_with("$ cd") {
                let name = line.split(" ").last().unwrap().to_string();
                if name.eq("/") {
                    continue;
                } else if name.eq("..") {
                    let parent = current_dir.borrow().parent_dir.clone().unwrap();
                    current_dir = parent;
                    continue;
                } else {
                    let holding =
                        match current_dir
                            .borrow()
                            .children
                            .borrow()
                            .iter()
                            .find(|&child| match child {
                                // DirChild::Dir(dir) => dir.name.eq(&name),
                                DirChild::Dir(dir) => dir.clone().borrow().name.eq(&name),
                                DirChild::File(_) => false,
                            }) {
                            Some(child_directory) => match child_directory {
                                DirChild::Dir(dir) => dir.clone(),
                                DirChild::File(_) => panic!("how did you get here?"),
                            },
                            None => {
                                panic!(
                                    "did not find child directory that should exist - {:?}, {:?}",
                                    current_dir.borrow().name,
                                    current_dir.borrow().children
                                )
                            }
                        };
                    current_dir = holding;
                }
            }
        } else if line.starts_with("dir") {
            let name = line.split(" ").last().unwrap();
            add_child_dir(&current_dir, name.to_string());
        } else {
            let value = line.split(" ").next().unwrap().parse::<usize>().unwrap();
            current_dir
                .borrow()
                .children
                .borrow_mut()
                .push(DirChild::File(value));
        }
    }
    root_dir
}
