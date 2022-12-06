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

const score = (
  ingredients: Ingredient[],
  solution: Record<string, number>
): number => {};

const part1 = (str: string, limit: number): number => {
  const ingredients = parseInput(str);
  const allIngredients: string[] = ingredients.map((i) => i.name);

  return 3;
};

export { parseInput, part1 };
