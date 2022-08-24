import { createSlice } from '@reduxjs/toolkit';

import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      const { id } = action.payload;
      return state.map((anecdote) => (anecdote.id === id ? action.payload : anecdote));
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(content);
  dispatch(appendAnecdote(newAnecdote));
};

export const voteAnecdote = (newAnecdote) => async (dispatch) => {
  const updatedAnecdote = await anecdoteService.updateVote(newAnecdote);
  dispatch(updateAnecdote(updatedAnecdote));
};

export default anecdoteSlice.reducer;
