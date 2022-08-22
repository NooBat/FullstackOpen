import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { voteAnecdote } from '../reducers/anecdoteReducer';

const anecdoteSelector = (state) => state;

const Anecdote = ({ anecdote, handleClick }) => (
  <div>
    <div>{anecdote.content}</div>
    <div>
      has
      {' '}
      {anecdote.votes}
      <button type='button' onClick={() => handleClick(anecdote.id)}>
        vote
      </button>
    </div>
  </div>
);

const AnecdoteList = () => {
  const anecdotes = useSelector(anecdoteSelector).sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return anecdotes.map((anecdote) => (
    <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote.id)} />
  ));
};

export default AnecdoteList;
