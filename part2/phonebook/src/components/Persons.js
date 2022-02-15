import React from "react";

const Persons = ({ persons }) => {
  const generateNames = (persons) =>
    persons.map((person) => (
      <p key={person.id}>
        {person.name} {person.number}
      </p>
    ));
  return <div>{generateNames(persons)}</div>;
};

export default Persons;
