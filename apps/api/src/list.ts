// index.js
import data from '../dummydata/recipes.json';
import { app } from './app';
app.get('/api/recipe/:recipeid', async (req: any, res: any) => {
  const recipe = data.find((element) => element.id === req.params.recipeid);
  console.log(recipe);
  res.send(recipe);
});

app.get('/api/list', (req: any, res: any) => {
  const filteredData = data.filter((recipe) => {
    return (
      recipe.title.toUpperCase().includes(req.query.search.toUpperCase()) ||
      recipe.ingredients.some((element) =>
        element.toUpperCase().includes(req.query.search.toUpperCase()),
      ) ||
      recipe.notes.toUpperCase().includes(req.query.search.toUpperCase()) ||
      recipe.tags.some((element) =>
        element.toUpperCase().includes(req.query.search.toUpperCase()),
      )
    );
  });

  console.log(filteredData);
  return res.json(
    filteredData.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        tags: recipe.tags,
      };
    }),
  );
});
