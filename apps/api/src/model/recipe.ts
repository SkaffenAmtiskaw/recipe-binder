import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const recipeSchema = new Schema({
  id: String,
  time: {
    prep: String,
    total: String,
    actual: String,
    cook: String,
  },
  servings: Number,
  instructions: [String],
  notes: String,
  source: {
    url: String,
    name: String,
  },
  storgae: String,
  tags: [String],
});

const Recipe = model('Recipe', recipeSchema);
export default Recipe;
