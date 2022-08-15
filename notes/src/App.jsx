import React, { useState, useEffect } from 'react';

import Footer from './components/Footer';
import Note from './components/Note';
import Notification from './components/Notification';

import loginService from './services/login';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(async () => {
    const fetchedNotes = await noteService.getAll();
    setNotes(fetchedNotes);
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      noteService.setToken(loggedUser.token);
    }
  }, []);

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    const updatedNote = await noteService.update(id, changedNote);

    setNotes(notes.map((n) => (n.id === id ? updatedNote : n)));
  };

  const addNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    };

    try {
      const note = await noteService.create(noteObject);
      setNotes(notes.concat(note));
      setNewNote('');
    } catch (err) {
      setErrorMessage('cannot add note to database');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));

      setUser(loggedInUser);
      setUsername('');
      setPassword('');
      noteService.setToken(user.token);
    } catch (err) {
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        {' '}
        <label htmlFor='username'>
          Username
          {' '}
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            name='username'
            id='username'
          />
        </label>
      </div>
      <div>
        {' '}
        <label htmlFor='password'>
          Password
          {' '}
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            name='password'
            id='password'
          />
        </label>
      </div>
      <button type='submit'>Login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type='submit'>save</button>
    </form>
  );

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user ? (
        <div>
          <p>
            {user.name}
            {' '}
            logged in
          </p>
          {noteForm()}
        </div>
      ) : (
        loginForm()
      )}

      <div>
        <button type='button' onClick={() => setShowAll(!showAll)}>
          show
          {' '}
          {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default App;
