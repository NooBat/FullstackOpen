import React, { useState } from "react";
import Contact from "./components/Contact";
import PersonForm from "./components/PersonForm";

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

  const contactToShow = showAll 
    ? persons
    : persons.filter(person => person.show)

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
      setPersons(contactToShow.map((person) => person.show = true))
    } else {
      setShowAll(false)
      setPersons(contactToShow.map((person) => {
        if (person.name.toLowerCase().indexOf(event.target.value) > -1) {
          person.show = true
        } else {
          person.show = false
        }
        return person
      }))
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
      <div>
        filter shown with <input onChange={handleFilter} />
      </div>
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />

      <h2>Numbers</h2>
      <Contact contacts={contactToShow} />
    </div>
  );
};

export default App;
