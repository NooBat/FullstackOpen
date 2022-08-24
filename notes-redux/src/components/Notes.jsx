import React from 'react';
import { connect } from 'react-redux';

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

const Notes = ({ notes, toggleImportance }) => (
  <ul>
    {notes.map((note) => (
      <Note key={note.id} note={note} handleClick={() => toggleImportance(note.id)} />
    ))}
  </ul>
);

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return {
      notes: state.notes,
    };
  }
  return {
    notes:
      state.filter === 'IMPORTANT'
        ? state.notes.filter((note) => note.important)
        : state.notes.filter((note) => !note.important),
  };
};

const mapDispatchToProps = {
  toggleImportance: toggleImportanceOf,
};

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes);

export default ConnectedNotes;
