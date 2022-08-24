import { createSlice } from '@reduxjs/toolkit';

const timeId = [];

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    removeNotification() {
      return null;
    },
  },
});

export const { createNotification, removeNotification } = notificationSlice.actions;

export const setNotification = (content, timeout) => async (dispatch) => {
  clearTimeout(timeId.shift());
  dispatch(createNotification(content));
  timeId.push(
    setTimeout(() => {
      dispatch(removeNotification());
    }, timeout),
  );
};

export default notificationSlice.reducer;
