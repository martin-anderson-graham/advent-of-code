const sample = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

const input = `Monkey 0:
  Starting items: 75, 75, 98, 97, 79, 97, 64
  Operation: new = old * 13
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 7

Monkey 1:
  Starting items: 50, 99, 80, 84, 65, 95
  Operation: new = old + 2
  Test: divisible by 3
    If true: throw to monkey 4
    If false: throw to monkey 5

Monkey 2:
  Starting items: 96, 74, 68, 96, 56, 71, 75, 53
  Operation: new = old + 1
  Test: divisible by 11
    If true: throw to monkey 7
    If false: throw to monkey 3

Monkey 3:
  Starting items: 83, 96, 86, 58, 92
  Operation: new = old + 8
  Test: divisible by 17
    If true: throw to monkey 6
    If false: throw to monkey 1

Monkey 4:
  Starting items: 99
  Operation: new = old * old
  Test: divisible by 5
    If true: throw to monkey 0
    If false: throw to monkey 5

Monkey 5:
  Starting items: 60, 54, 83
  Operation: new = old + 4
  Test: divisible by 2
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 6:
  Starting items: 77, 67
  Operation: new = old * 17
  Test: divisible by 13
    If true: throw to monkey 4
    If false: throw to monkey 1

Monkey 7:
  Starting items: 95, 65, 58, 76
  Operation: new = old + 5
  Test: divisible by 7
    If true: throw to monkey 3
    If false: throw to monkey 6`;

export { input, sample };
