import data from '../dummydata/recipes.json';
import { app } from './app';
import fs from 'fs';

app.post('/api/add', async (req: any, res: any) => {
  //console.log(req.body);
  try {
    const newData = [...data, req.body];

    await fs.writeFile(
      './dummydata/recipes.json',
      JSON.stringify(newData),
      'utf8',
      (err) => {
        if (err) console.log(err);
      },
    );
    return res.send('Success');
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('service error');
  }
});
