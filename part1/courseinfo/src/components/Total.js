import React from 'react';

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercise{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </>
  );
};

export default Total
