import { createSlice } from '@reduxjs/toolkit';

import blogService from '../services/blogs';

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
    removeBlog(state, action) {
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
  addBlog, setBlogs, updateBlog, removeBlog,
} = blogSlice.actions;

export const getAll = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createNew = (blogObj) => async (dispatch) => {
  const newBlog = await blogService.create(blogObj);
  dispatch(addBlog(newBlog));
};

export const update = (blogToUpdate) => async (dispatch) => {
  const updatedBlog = await blogService.update(blogToUpdate);
  dispatch(updateBlog(updatedBlog));
};

export const deleteBlog = (id) => async (dispatch) => {
  await blogService.deleteBlog(id);
  dispatch(removeBlog(id));
};
