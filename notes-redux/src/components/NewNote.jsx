import React from 'react';
import { useDispatch } from 'react-redux';

import { createNote } from '../reducers/noteReducers';

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    // eslint-disable-next-line no-param-reassign
    event.target.note.value = '';
    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input name='note' type='text' />
      <button type='submit'>add</button>
    </form>
  );
};

export default NewNote;
