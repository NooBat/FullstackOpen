import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  const generatePart = (parts) => {
    return parts.map((part) => {
      return <Part key={part.id} name={part.name} value={part.exercises} />;
    });
  };

  return <div>{generatePart(parts)}</div>;
};

export default Content;
