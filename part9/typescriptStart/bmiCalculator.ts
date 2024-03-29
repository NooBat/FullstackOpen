const bmiCalculator = (height: number, mass: number): string => {
  const bmi: number = mass / (height / 100) ** 2;

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweigth (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal (Healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  }

  return 'Obese (Class III)';
};

interface BmiValues {
  height: number;
  mass: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!Number.isNaN(Number(args[2])) && !Number.isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    };
  }
  throw new Error('Provided values were not numbers!');
};

try {
  const { height, mass } = parseArguments(process.argv);
  console.log(bmiCalculator(height, mass));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage = `${errorMessage} Error: ${error.message}`;
  }
  console.log(errorMessage);
}

export default bmiCalculator;
