import express from 'express';

import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  const { dailyExercises, target } = req.body;
  console.log(req.body);
  let isMalformatted = false;

  if (!dailyExercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  dailyExercises.forEach((hour: number) => {
    if (Number.isNaN(Number(hour))) {
      isMalformatted = true;
    }
  });

  if (isMalformatted || Number.isNaN(Number(target))) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  return res.status(201).send(
    exerciseCalculator(
      dailyExercises.map((hour: string | number) => Number(hour)),
      Number(target)
    )
  );
});

const PORT = 3003;
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
