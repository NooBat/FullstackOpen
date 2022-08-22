import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleImportanceOf } from '../reducers/noteReducers';

const noteSelector = (state) => state;

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

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(noteSelector);

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <ul>
      {notes.map((note) => (
        <Note note={note} handleClick={() => toggleImportance(note.id)} />
      ))}
    </ul>
  );
};

export default Notes;
