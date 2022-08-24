import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const anecdoteSelector = (state) => state.anecdotes;
const filterSelector = (state) => state.filter;

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
  const anecdotes = useSelector(anecdoteSelector);
  const filter = useSelector(filterSelector);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 || 0 };
    dispatch(voteAnecdote(newAnecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5000));
  };

  const filteredAnecdotes = anecdotes.filter((anecdote) => anecdote.content.match(new RegExp(`^${filter}`, 'i')));
  const sortedFilteredAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes);

  return sortedFilteredAnecdotes.map((anecdote) => (
    <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
  ));
};

export default AnecdoteList;
