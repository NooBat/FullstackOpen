import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    loginUser(state, { payload }) {
      return payload;
    },
    logoutUser() {
      return null;
    },
  },
});

export default userSlice.reducer;
export const { loginUser, logoutUser } = userSlice.actions;
