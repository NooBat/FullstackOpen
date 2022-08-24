import React from 'react';
import { connect } from 'react-redux';

import { createNote } from '../reducers/noteReducer';

const NewNote = ({ newNote }) => {
  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    // eslint-disable-next-line no-param-reassign
    event.target.note.value = '';
    newNote(content);
  };

  return (
    <form onSubmit={addNote}>
      <input name='note' type='text' />
      <button type='submit'>add</button>
    </form>
  );
};

const mapDispatchToProps = {
  newNote: createNote,
};

const ConnectedNewNote = connect(null, mapDispatchToProps)(NewNote);

export default ConnectedNewNote;
