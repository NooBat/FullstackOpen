import React, { useState, useEffect, useRef } from 'react';

import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

import loginService from './services/login';
import noteService from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

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

  const login = async (userObject) => {
    try {
      const loggedInUser = await loginService.login(userObject);
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      noteService.setToken(loggedInUser.token);
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const createNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility();
    try {
      const note = await noteService.create(noteObject);
      setNotes(notes.concat(note));
    } catch (e) {
      setErrorMessage('cannot add note to database');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

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
          <Togglable buttonLabel='create new note' ref={noteFormRef}>
            <NoteForm createNote={createNote} />
          </Togglable>
        </div>
      ) : (
        <Togglable buttonLabel='log in'>
          <LoginForm login={login} />
        </Togglable>
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
