import React from "react";
import Part from "./Part";

const generatePart = (parts) => {
  return parts.map((part) => {
    return <Part key={part.id} name={part.name} num={part.exercises} />;
  });
};

const Content = ({ parts }) => {
  return <div>{generatePart(parts)}</div>;
};

export default Content;
