type Ingredient = {
  name: string;
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;
};

const parseInput = (str: string): Ingredient[] => {
  return str.split("\n").map((row) => {
    let arr = row.replace(new RegExp(",", "g"), "").split(" ");
    return {
      name: arr[0].slice(0, -1),
      capacity: Number(arr[2]),
      durability: Number(arr[4]),
      flavor: Number(arr[6]),
      texture: Number(arr[8]),
      calories: Number(arr[10]),
    };
  });
};

const score1 = (
  ingredients: Ingredient[],
  solution: Record<string, number>
): number => {
  let result: Record<string, number> = {
    capacity: 0,
    durability: 0,
    flavor: 0,
    texture: 0,
    // calories: 0,
  };
  Object.keys(solution).forEach((key) => {
    let qty = solution[key];
    let ing = ingredients.find((i) => i.name === key);
    result.capacity += ing.capacity * qty;
    result.durability += ing.durability * qty;
    result.flavor += ing.flavor * qty;
    result.texture += ing.texture * qty;
  });
  if (Object.values(result).some((val) => val <= 0)) {
    return 0;
  }
  return Object.values(result).reduce((prod, ele) => prod * ele, 1);
};

const part1 = (str: string, limit: number): number => {
  const ingredients = parseInput(str);
  const allIngredients: string[] = ingredients.map((i) => i.name);
  let max = -Infinity;

  const backtrack = (
    solution: Record<string, number>,
    remainingIngredients: string[],
    total: number
  ): void => {
    if (remainingIngredients.length === 1) {
      solution[remainingIngredients[0]] = limit - total;
      let scr = score1(ingredients, solution);
      if (scr > max) {
        max = scr;
      }
      delete solution[remainingIngredients[0]];
      return;
    } else {
      remainingIngredients.forEach((ing) => {
        let newRemaining = remainingIngredients.filter((i) => i !== ing);
        for (let i = 1; i < limit - total + 1; i++) {
          solution[ing] = i;
          backtrack(solution, newRemaining, total + i);
          delete solution[ing];
        }
      });
    }
  };

  backtrack({} as Record<string, number>, allIngredients, 0);
  return max;
};

const score2 = (
  ingredients: Ingredient[],
  solution: Record<string, number>,
  calLimit: number
): number => {
  let result: Record<string, number> = {
    capacity: 0,
    durability: 0,
    flavor: 0,
    texture: 0,
    calories: 0,
  };
  Object.keys(solution).forEach((key) => {
    let qty = solution[key];
    let ing = ingredients.find((i) => i.name === key);
    result.capacity += ing.capacity * qty;
    result.durability += ing.durability * qty;
    result.flavor += ing.flavor * qty;
    result.texture += ing.texture * qty;
    result.calories += ing.calories * qty;
  });
  if (
    Object.values(result).some((val) => val <= 0) ||
    result.calories !== calLimit
  ) {
    return 0;
  }
  let res =
    Object.values(result).reduce((prod, ele) => prod * ele, 1) /
    result.calories;
  // console.log(solution, result, res);
  return res;
};

const part2 = (str: string, limit: number, calLimit: number): number => {
  const ingredients = parseInput(str);
  const allIngredients: string[] = ingredients.map((i) => i.name);
  let max = -Infinity;

  const backtrack = (
    solution: Record<string, number>,
    remainingIngredients: string[],
    total: number
  ): void => {
    if (remainingIngredients.length === 1) {
      solution[remainingIngredients[0]] = limit - total;
      let scr = score2(ingredients, solution, calLimit);
      if (scr > max) {
        // console.log(solution, max);
        max = scr;
      }
      delete solution[remainingIngredients[0]];
      return;
    } else {
      remainingIngredients.forEach((ing) => {
        let newRemaining = remainingIngredients.filter((i) => i !== ing);
        for (let i = 0; i < limit - total + 1; i++) {
          solution[ing] = i;
          backtrack(solution, newRemaining, total + i);
          delete solution[ing];
        }
      });
    }
  };

  backtrack({} as Record<string, number>, allIngredients, 0);
  return max;
};
export { parseInput, part1, score1, part2, score2 };
