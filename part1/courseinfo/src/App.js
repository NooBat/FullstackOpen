import React from "react";
import { useState } from "react";

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.num}
      </p>
    </>
  );
};

const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  );
};

const Content = (props) => {
  console.log(props);
  return (
    <>
      <Part name={props.parts[0].name} num={props.parts[0].exercises} />
      <Part name={props.parts[1].name} num={props.parts[1].exercises} />
      <Part name={props.parts[2].name} num={props.parts[2].exercises} />
    </>
  );
};

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

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  };

  console.log(allClicks)

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>
    </div>
  );
};

export default App;
