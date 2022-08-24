/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';

import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

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

const AnecdoteList = ({ anecdotes, voteAnecdote, setNotification }) => {
  const vote = (anecdote) => {
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 || 0 };
    voteAnecdote(newAnecdote);
    setNotification(`you voted '${anecdote.content}'`, 5000);
  };

  return anecdotes.map((anecdote) => (
    <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} />
  ));
};

const mapStateToProps = (state) => {
  const filteredAnecdotes = state.anecdotes.filter((anecdote) => anecdote.content.match(new RegExp(`^${state.filter}`, 'i')));
  const sortedFilteredAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes);

  return {
    anecdotes: sortedFilteredAnecdotes,
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
};

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);

export default ConnectedAnecdoteList;
