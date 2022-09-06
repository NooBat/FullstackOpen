import express from 'express';

import bmiCalculator from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { query } = req;

  if (
    !Number.isNaN(Number(query.height)) &&
    !Number.isNaN(Number(query.weight))
  ) {
    const { height, weight } = query;
    res.status(200).json({
      weight,
      height,
      bmi: bmiCalculator(Number(height), Number(weight)),
    });
  } else {
    res.status(400).send({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
