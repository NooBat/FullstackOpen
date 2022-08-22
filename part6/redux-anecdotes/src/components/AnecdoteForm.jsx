import React from 'react';
import { useDispatch } from 'react-redux';

import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    // eslint-disable-next-line no-param-reassign
    event.target.anecdote.value = '';
    dispatch(createAnecdote(content));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' type='text' />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
