import Contact from "./components/Contact";
import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: "Arto Hellas", 
      number: "040-123456", 
      visible: true,
      id: 1 
    },
    { 
      name: "Ada Lovelace", 
      number: "39-44-532523", 
      visible: true,
      id: 2 
    },
  ]);
  const [filter, setFilter] = useState("")
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.findIndex((person) => person.name === newName) > -1) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const lowerCaseName = newName.toLowerCase()
      const newPerson = {
        name: newName,
        number: newNumber,
        visible: lowerCaseName.indexOf(filter.toLowerCase()) > -1,
        id: persons[persons.length - 1].id + 1,
      };
      setPersons(persons.concat(newPerson));
    }

    setNewName("");
    setNewNumber("");
  };

  const handleFilter = (event) => {
    console.log(filter.length, event.target.value.length)
    if (event.target.value.length < filter.length || event.target.value.length === 0) {
      setPersons(persons.map((person) => {
        person.visible = true
        return person
      }))
    }
    setFilter(event.target.value)
    setPersons(persons.map((person) => {
      const lowerCaseName = person.name.toLowerCase()
      console.log(filter)
      if (lowerCaseName.indexOf(filter.toLowerCase()) > -1) {
        person.visible = true
      } else {
        person.visible = false
      }
      return person
    }))
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilter}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contact contacts={persons} />
    </div>
  );
};

export default App;
