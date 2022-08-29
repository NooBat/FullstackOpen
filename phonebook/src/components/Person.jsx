import React from "react";

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={() => handleDelete(person.id, person.name)}>
        delete {person.name}
      </button>
    </div>
  );
};

export default Person;
