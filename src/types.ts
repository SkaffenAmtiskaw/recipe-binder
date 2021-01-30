export type Recipe = {
  id: string,
  ingredients: string[],
  instructions: string[],
  notes: string,
  servings?: number,
  source: {
    name?: string,
    url?: string,
  },
  storage: string,
  tags: string[],
  title: string,
};
