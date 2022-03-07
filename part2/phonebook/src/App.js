import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import Person from "./components/Person";
import PersonForm from "./components/PersonForm";
import formService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState("");
  const [typeOfNotification, setTypeOfNotification] = useState("");

  const personToShow = showAll
    ? persons
    : persons.filter((person) => person.show);

  useEffect(() => {
    formService
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch((err) => {
        setMessage("Information not found");
        setTypeOfNotification("error");
      });
    setTimeout(() => {
      setMessage("");
      setTypeOfNotification("");
    }, 5000);
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (
      persons.findIndex(
        (person) => person.name === newName && person.number === newNumber
      ) > -1
    ) {
      setMessage(`${newName} is already added to phonebook`);
      setTypeOfNotification("error");
    } else if (persons.findIndex((person) => person.name === newName) > -1) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person =
          persons[persons.findIndex((person) => person.name === newName)];
        const oldNumber = person.number;

        const updatedPerson = {
          ...person,
          number: newNumber,
        };

        formService
          .updateContact(person.id, updatedPerson)
          .then((response) => {
            setPersons(persons.map((p) => (p.id === person.id ? response : p)));
            setMessage(
              `Changed ${response.name}'s from ${oldNumber} to ${response.number}`
            );
            setTypeOfNotification("notification");
            setNewName("");
            setNewNumber("");
          })
          .catch((err) => {
            setMessage(
              `Cannot change ${person.name}'s from ${oldNumber} to ${newNumber} because of ${err}`
            );
            setTypeOfNotification("error");
          });
      }
    } else {
      const id = Math.max(...persons.map(person => person.id)) + 1;
      const newPerson = {
        id: id,
        name: newName,
        number: newNumber,
        visible: true,
      };
      formService
        .createContact(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${response.name} to the phonebook`);
          setTypeOfNotification("notification");
        })
        .catch((err) => {
          setMessage(
            `Cannot add ${newName} to the phonebook because of ${err}`
          );
          setTypeOfNotification("error");
        });
    }
    setTimeout(() => {
      setMessage("");
      setTypeOfNotification("");
    }, 5000);
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

  const deleteContact = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      formService
        .deleteContact(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          setMessage(`Deleted ${name}`);
          setTypeOfNotification("notification");
        })
        .catch((error) => {
          setMessage(
            `Information of ${name} has already been removed from the server`
          );
          setTypeOfNotification("error");
        });
      setTimeout(() => {
        setMessage("");
        setTypeOfNotification("");
      }, 5000);
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
      <Notification message={{ content: message, style: typeOfNotification }} />
      <div>
        filter shown with <Filter handleFilter={handleFilter} />
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
      <div>
        {personToShow.map((person) => (
          <Person
            key={person.id}
            person={person}
            handleDelete={deleteContact}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
