import React from 'react';
import { useDispatch } from 'react-redux';

import noteService from '../services/notes';
import { createNote } from '../reducers/noteReducer';

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    // eslint-disable-next-line no-param-reassign
    event.target.note.value = '';
    const newNote = await noteService.createNew(content);
    dispatch(createNote(newNote));
  };

  return (
    <form onSubmit={addNote}>
      <input name='note' type='text' />
      <button type='submit'>add</button>
    </form>
  );
};

export default NewNote;
