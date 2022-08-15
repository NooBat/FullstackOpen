import React, { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Note from './components/Note';
import Notification from './components/Notification';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    noteService
      .getAll()
      .then((response) => {
        setNotes(response);
      });
  }, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((n) => (n.id === id ? response : n)));
      })
      .catch(() => {
        setErrorMessage(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    };

    noteService
      .create(noteObject)
      .then((response) => {
        setNotes(notes.concat(response));
        setNewNote('');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('cannot create note');
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

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
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
