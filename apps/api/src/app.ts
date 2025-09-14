import express from 'express';

export const app = express();
const port = '3000';

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
