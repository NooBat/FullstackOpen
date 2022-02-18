import React, { useEffect, useState } from "react";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import formService from "./services/form";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const personToShow = showAll
    ? persons
    : persons.filter((person) => person.visible);

  useEffect(() => {
    formService
      .getAll()
      .then((response) => {
        console.log(response);
        setPersons(response.data);
      })
      .catch((err) => {
        alert(err + " was catched while executing getAll()");
      });
  }, []);

  console.log(persons);

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.findIndex((person) => person.name === newName) > -1) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const id = persons[persons.length - 1].id + 1;
      const newPerson = {
        id: id,
        name: newName,
        number: newNumber,
        visible: true,
      };
      formService
        .createContact(newPerson)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => {
          alert(err + " was catched while executing createContact()");
        });
    }
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
      <div>
        {personToShow.map((person) => (
          <Person person={person} key={person.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
