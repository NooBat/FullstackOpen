import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleImportanceOf } from '../reducers/noteReducer';

const Note = ({ note, handleClick }) => (
  <li>
    {note.content}
    {' '}
    <strong>{note.important ? 'important' : ''}</strong>
    <button type='button' onClick={() => handleClick(note.id)}>
      make
      {' '}
      {note.important ? 'not important' : 'important'}
    </button>
  </li>
);

const noteSelector = (state) => {
  if (state.filter === 'ALL') {
    return state.notes;
  }
  return state.filter === 'IMPORTANT'
    ? state.notes.filter((note) => note.important)
    : state.notes.filter((note) => !note.important);
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(noteSelector);

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <ul>
      {notes.map((note) => (
        <Note key={note.id} note={note} handleClick={() => toggleImportance(note.id)} />
      ))}
    </ul>
  );
};

export default Notes;
