import React from 'react';

const Total = ({ parts }) => {
  const calculateSum = parts => parts.reduce((total, part) => {
    return total + part.exercises
  }, 0)

  return (
    <>
      <h3>
        total of {calculateSum(parts)} exercises
      </h3>
    </>
  );
};

export default Total
