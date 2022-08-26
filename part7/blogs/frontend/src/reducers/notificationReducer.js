import { createSlice } from '@reduxjs/toolkit';

const timeoutIdList = [];

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

export default notificationSlice.reducer;

export const { createNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (notification, timeout) => async (dispatch) => {
  clearTimeout(timeoutIdList.shift());
  dispatch(createNotification(notification));
  timeoutIdList.push(
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout),
  );
};
