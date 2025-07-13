export type Recipe = {
  id: string;
  ingredients: string[];
  instructions: string[];
  notes: string;
  servings?: number;
  source: {
    name?: string;
    url?: string;
  };
  storage: string;
  tags: string[];
  time: {
    prep?: string;
    cook?: string;
    total?: string;
    actual?: string;
  };
  title: string;
};
