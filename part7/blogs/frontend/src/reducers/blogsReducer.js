import { createSlice } from '@reduxjs/toolkit';

import blogService from '../services/blogs';

const sortByLikes = (a, b) => b.likes - a.likes;

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, { payload }) {
      state.push(payload).sort(sortByLikes);
    },
    updateBlog(state, { payload }) {
      const updatedBlog = payload;
      return state
        .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        .sort(sortByLikes);
    },
    removeBlog(state, { payload }) {
      const id = payload;
      return state.filter((blog) => blog.id !== id).sort(sortByLikes);
    },
    setBlogs(state, { payload }) {
      return payload.sort(sortByLikes);
    },
  },
});

export default blogSlice.reducer;

export const {
  appendBlog, setBlogs, updateBlog, removeBlog,
} = blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createNew = (blogObj) => async (dispatch) => {
  const newBlog = await blogService.create(blogObj);
  dispatch(appendBlog(newBlog));
};

export const update = (blogToUpdate) => async (dispatch) => {
  const updatedBlog = await blogService.update(blogToUpdate);
  dispatch(updateBlog(updatedBlog));
};

export const deleteBlog = (id) => async (dispatch) => {
  await blogService.deleteBlog(id);
  dispatch(removeBlog(id));
};
