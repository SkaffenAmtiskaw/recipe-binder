import mongoose from 'mongoose';
import Recipe from './model/recipe';
export * from './add';
export * from './list';

mongoose.connect(
  'mongodb+srv://lxkh8199i:JwQuOQII5P9IptcI@recipecluster.ub0ijql.mongodb.net/?retryWrites=true&w=majority&appName=RecipeCluster',
);
