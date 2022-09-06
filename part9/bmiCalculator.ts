const bmiCalculator = (height: number, mass: number) : string => {
  const bmi: number = mass / Math.pow(height / 100, 2);
  
  if (bmi < 16) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweigth (Mide thinness)";
  } else if (bmi < 25) {
    return "Normal (Heathy weight)";
  } else if (bmi < 30) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35) {
    return "Obese (Class I)";
  } else if (bmi < 40) {
    return "Obese (Class II)";
  }

  return "Obese (Class III)"
};

interface BmiValues {
  height: number,
  mass: number
}

console.log(bmiCalculator(175, 80))
