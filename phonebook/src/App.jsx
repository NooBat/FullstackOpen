import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import Notification from './components/Notification';
import Person from './components/Person';
import PersonForm from './components/PersonForm';
import formService from './services/persons';

const timeoutId = [];

const App = () => {
  const [persons, setPersons] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);

  const personToShow = showAll
    ? persons
    : persons.filter((person) => person.show);

  useEffect(() => {
    formService
      .getAll()
      .then((response) => {
        setPersons(response);
      })
      .catch(() => {
        clearTimeout(timeoutId.shift());
        setMessage({ message: 'Contact not found', color: 'red' });
        timeoutId.push(
          setTimeout(() => {
            setMessage(null);
          }, 5000)
        );
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (
      persons.findIndex(
        (person) => person.name === newName && person.number !== newNumber
      ) > -1
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person =
          persons[
            persons.findIndex(
              (person) => person.name === newName && person.number !== newNumber
            )
          ];

        const oldNumber = person.number;

        const updatedPerson = {
          name: person.name,
          number: newNumber,
        };

        formService
          .updateContact(person.id, updatedPerson)
          .then((response) => {
            setPersons(persons.map((p) => (p.id === person.id ? response : p)));
            clearTimeout(timeoutId.shift());
            setMessage({
              message: `Changed ${response.name}'s from ${oldNumber} to ${response.number}`,
              color: 'green',
            });
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            clearTimeout(timeoutId.shift());
            setMessage({ message: error.response.data.error, color: 'red' });
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      formService
        .createContact(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');
          clearTimeout(timeoutId.shift());
          setMessage({
            message: `Added ${response.name} to the phonebook`,
            color: 'green',
          });
        })
        .catch((error) => {
          clearTimeout(timeoutId.shift());
          setMessage({
            message: `Cannot add ${newName} to the phonebook because of ${error.response.data.error}`,
            color: 'red',
          });
        });
    }
    timeoutId.push(
      setTimeout(() => {
        setMessage(null);
      }, 5000)
    );
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
          clearTimeout(timeoutId.shift());
          setMessage({ message: `Deleted ${name}`, color: 'green' });
        })
        .catch((error) => {
          clearTimeout(timeoutId.shift());
          setMessage({
            message: `Information of ${name} has already been removed from the server`,
            color: 'red',
          });
        });
      timeoutId.push(
        setTimeout(() => {
          setMessage(null);
        }, 5000)
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
