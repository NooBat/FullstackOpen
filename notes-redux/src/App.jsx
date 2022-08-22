import React from 'react';
import { legacy_createStore as createStore } from 'redux';

import noteReducer from './reducers/noteReducers';

const store = createStore(noteReducer);

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2,
  },
});

const App = () => {
  const generateId = () => Number((Math.random() * 1000000).toFixed(0));

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    // eslint-disable-next-line no-param-reassign
    event.target.note.value = '';
    store.dispatch({
      type: 'NEW_NOTE',
      data: {
        content,
        important: false,
        id: generateId(),
      },
    });
  };

  const toggleImportance = (id) => {
    store.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      data: { id },
    });
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name='note' type='text' />
        <button type='submit'>add</button>
      </form>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id}>
            {note.content}
            {' '}
            <strong>{note.important ? 'important' : ''}</strong>
            <button type='button' onClick={() => toggleImportance(note.id)}>
              make
              {' '}
              {note.important ? 'not important' : 'important'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
