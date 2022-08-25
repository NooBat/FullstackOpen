/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { update, deleteBlog } from '../reducers/blogsReducer';

const Blog = ({ blog, username }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const handleClickLike = () => {
    const updatedBlog = {
      ...blog,
      user: blog.user ? blog.user.id : undefined,
      likes: blog.likes + 1,
    };

    dispatch(update(updatedBlog));
  };

  const handleClickDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id));
    }
  };

  return (
    <section
      className='blog'
      style={{
        margin: '5px',
        padding: '10px',
        borderRadius: '10px',
        border: '3px solid black',
      }}
    >
      <article className='defaultView'>
        {blog.title}
        {' '}
        {blog.author}
        {' '}
        <button type='button' onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </article>
      <div style={{ display: visible ? '' : 'none' }} className='toggledView'>
        <p style={{ margin: '10px 0 0 0' }}>{blog.url}</p>
        <p className='blogLikes' style={{ margin: '5px 0 0 0' }}>
          likes
          {' '}
          {blog.likes}
          {' '}
          <button id='like-button' type='button' onClick={handleClickLike}>
            like
          </button>
        </p>
        <p id='blog-owner' style={{ margin: '5px 0 0 0' }}>
          {blog.user ? blog.user.name : 'Anonymous'}
        </p>
        {blog.user && blog.user.username === username ? (
          <button
            id='delete-button'
            style={{ margin: '5px 0 0 0' }}
            type='button'
            onClick={handleClickDelete}
          >
            remove
          </button>
        ) : null}
      </div>
    </section>
  );
};

const blogSelector = (state) => {
  const sortedBlogsByLikes = [...state.blogs].sort((a, b) => b.likes - a.likes);
  return sortedBlogsByLikes;
};

const BlogList = ({ username }) => {
  const blogs = useSelector(blogSelector);

  return blogs.map((blog) => <Blog key={blog.id} blog={blog} username={username} />);
};

export default BlogList;
