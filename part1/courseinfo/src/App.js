import React from 'react';

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.num}
      </p>
    </>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part name={props.parts[0].name} num={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} num={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} num={props.parts[2].exercises}/>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercise {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content 
        parts={course.parts}  
      />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;
