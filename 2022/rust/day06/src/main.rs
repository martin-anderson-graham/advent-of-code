use std::collections::HashMap;

fn main() {
    let ex1 = include_str!("ex1.txt");
    let input = include_str!("input.txt");
    assert_eq!(find_first_distinct(4, ex1), 11);
    assert_eq!(find_first_distinct(4, input), 1855);
    assert_eq!(find_first_distinct(14, ex1), 26);
    assert_eq!(find_first_distinct(14, input), 3256);
}

fn no_duplicates(hash: &HashMap<&str, usize>) -> bool {
    !(hash.values().filter(|v| *v > &1).count() > 0)
}

fn find_first_distinct(n: usize, str: &str) -> usize {
    let mut vals = HashMap::<&str, usize>::new();
    let mut str_iter = str.split("").enumerate();
    let mut letter_at_0 = &str[0..1];
    for _ in 0..n+1 {
        let Some((_, letter)) = str_iter.next() else {
            panic!("Not enough characters");
        };
        if letter == "" {
            continue
        }
        match vals.get(letter) {
            Some(val) => vals.insert(letter, val + 1),
            None => vals.insert(letter, 1),
        };
    }
    while let Some((index, letter)) = str_iter.next() {
        if no_duplicates(&vals) {
            return index - 1
        }
        match vals.get(letter_at_0) {
            Some(val) => vals.insert(letter_at_0, val - 1),
            None => panic!("Trying to remove a letter, and didn't find it"),
        };
        match vals.get(letter) {
            Some(val) => vals.insert(letter, val + 1),
            None => vals.insert(letter, 1),
        };
        letter_at_0 = &str[(index - n)..(index - n + 1)];
    }
    panic!("Reached the end without finding a result packet")
}
