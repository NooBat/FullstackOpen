import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    createNotification(state, action) {
      state.push(action.payload);
    },
    removeNotification(state) {
      state.shift();
    },
  },
});

export const { createNotification, removeNotification } = notificationSlice.actions;

export const setNotification = (content, timeout) => async (dispatch) => {
  dispatch(createNotification(content));
  setTimeout(() => {
    dispatch(removeNotification());
  }, timeout);
};

export default notificationSlice.reducer;
