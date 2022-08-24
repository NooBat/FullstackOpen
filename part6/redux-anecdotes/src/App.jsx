import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { initializeAnecdotes } from './reducers/anecdoteReducer';

import ConnectedAnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import ConnectedFilter from './components/Filter';
import ConnectedNotification from './components/Notification';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <ConnectedFilter />
      <ConnectedNotification />
      <AnecdoteList />
      <ConnectedAnecdoteForm />
    </div>
  );
};

export default App;
