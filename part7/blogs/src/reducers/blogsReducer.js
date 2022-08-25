import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) => (blog.id === action.payload.id ? updatedBlog : blog));
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export default blogSlice.reducer;
export const {
  addBlog, setBlogs, updateBlog, deleteBlog,
} = blogSlice.actions;
