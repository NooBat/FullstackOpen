interface ExerciseValues {
  dailyHour: Array<number>;
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}

const parseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const dailyHour: Array<number> = args.slice(3).map((str) => Number(str));

  for (const num of dailyHour) {
    if (isNaN(num)) {
      throw new Error('Provided values were not numbers!');
    }
  }

  if (!isNaN(Number(args[2]))) {
    return {
      dailyHour,
      target: Number(args[2]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const exerciseCalculator = (dailyHour: number[], target: number): Result => {
  const periodLength: number = dailyHour.length;
  const trainingDays: number = dailyHour.filter((hour) => hour !== 0).length;
  const average =
    dailyHour.reduce((prev, curr) => prev + curr, 0) / periodLength;
  const success = average >= target;
  let rating: 1 | 2 | 3 = 1;
  let ratingDescription: string = '';

  if (average >= 1.2 * target) {
    rating = 3;
    ratingDescription = 'Good job! Keep up the good work';
  } else if (average >= 0.8 * target) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'Try harder next time!';
  }

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

try {
  const { dailyHour, target } = parseArguments(process.argv);
  console.log(exerciseCalculator(dailyHour, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default exerciseCalculator;
