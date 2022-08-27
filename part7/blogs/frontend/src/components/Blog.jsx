/* eslint-disable no-alert */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { update, deleteBlog, createComment } from '../reducers/blogsReducer';
import { useField } from '../hooks';

const selectUser = (state) => state.user;

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const [comment, resetComment] = useField('text');

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

  const handleClickComment = (event) => {
    event.preventDefault();
    resetComment();
    dispatch(createComment(blog.id, { comment: comment.value }));
  };

  return blog ? (
    <section className='blog'>
      <div>
        <h2 className='defaultView'>
          {blog.title} {blog.author}
        </h2>
        <a
          href={blog.url}
          target='_blank'
          style={{ margin: '10px 0 0 0' }}
          rel='noreferrer'
        >
          {blog.url}
        </a>
        <p className='blogLikes' style={{ margin: '5px 0 0 0' }}>
          {blog.likes} likes{' '}
          <button id='like-button' type='button' onClick={handleClickLike}>
            like
          </button>
        </p>
        <p id='blog-owner' style={{ margin: '5px 0 0 0' }}>
          added by {blog.user.name}
        </p>
        <h3>Comments</h3>
        <form onSubmit={handleClickComment}>
          <input {...comment} />
          <button type='submit'>add</button>
        </form>
        <ul>
          {blog.comments.map((c) => (
            <li key={`comment${(Math.random() * 10000).toFixed(0)}`}>{c}</li>
          ))}
        </ul>
        {blog.user.username === user.username ? (
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
  ) : null;
};

export default Blog;
