export type Dish = {
  name: string;
  source?: string;
  note?: string;
};

export type Meal = {
  food: Dish[];
  title: string;
  subtitle?: string;
};

export type Day = {
  meals: Meal[];
  note?: string;
};
