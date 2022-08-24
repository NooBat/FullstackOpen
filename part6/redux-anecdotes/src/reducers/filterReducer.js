import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    changeFilter(state, action) {
      return action.payload;
    },
    resetFilter() {
      return '';
    },
  },
});

export const { changeFilter, resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
