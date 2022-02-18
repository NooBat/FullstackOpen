import React from "react";

const Person = ({ key, person }) => {
  return <p key={key}>{person.name} {person.number}</p>;
};

export default Person;
