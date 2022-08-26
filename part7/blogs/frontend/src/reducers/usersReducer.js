import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    initializeWith(state, { payload }) {
      return payload;
    },
  },
});

export const { initializeWith } = slice.actions;
export default slice.reducer;

export const initializeUsers = () => async (dispatch) => {
  const response = await userService.getAll();
  dispatch(initializeWith(response.data));
};
