import React, { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      number: "040-123456",
      show: true,
      id: 1,
    },
    {
      name: "Ada Lovelace",
      number: "39-44-532523",
      show: true,
      id: 2,
    },
  ]);
  const [showAll, setShowAll] = useState(true);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.findIndex((person) => person.name === newName) > -1) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        visible: true,
        id: persons[persons.length - 1].id + 1,
      };
      setPersons(persons.concat(newPerson));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleFilter = (event) => {
    if (event.target.value.length === 0) {
      setShowAll(true);
      setPersons(
        persons.map((person) => {
          person.show = true;
          return person;
        })
      );
    } else {
      setShowAll(false);
      setPersons(
        persons.map((person) => {
          if (
            person.name
              .toLowerCase()
              .indexOf(event.target.value.toLowerCase()) !== -1
          ) {
            person.show = true;
          } else {
            person.show = false;
          }
          return person;
        })
      );
    }
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilter={handleFilter} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />

      <h2>Numbers</h2>
      <Persons
        persons={showAll ? persons : persons.filter((person) => person.show)}
      />
    </div>
  );
};

export default App;
