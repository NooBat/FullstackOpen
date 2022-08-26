import axios from 'axios';

import userService from './user';

const baseUrl = '/api/blogs';

async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

async function create(newBlog) {
  const config = {
    headers: { Authorization: `bearer ${userService.getToken()}` },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
}

async function update(newBlog) {
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog);
  return response.data;
}

async function deleteBlog(id) {
  const config = {
    headers: { Authorization: `bearer ${userService.getToken()}` },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
}

export default {
  getAll,
  create,
  update,
  deleteBlog,
};
