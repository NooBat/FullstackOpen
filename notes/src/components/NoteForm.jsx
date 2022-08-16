import React, { useState } from 'react';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      import: Math.random() > 0.5,
    });

    setNewNote('');
  };

  return (
    <form onSubmit={addNote}>
      <input type='text' value={newNote} onChange={({ target }) => setNewNote(target.value)} />
      <button type='submit'>save</button>
    </form>
  );
};

export default NoteForm;
