import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField } from '@mui/material';

import { useField } from '../hooks';

import { createNew } from '../reducers/blogsReducer';
import { setNotification } from '../reducers/notificationReducer';

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch();

  const [title, resetTitle] = useField('text');
  const [author, resetAuthor] = useField('text');
  const [url, resetUrl] = useField('url');

  const handleCreateBlog = (event) => {
    blogFormRef.current.toggleVisibility();

    event.preventDefault();
    const blogObj = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    try {
      dispatch(createNew(blogObj));
      resetTitle();
      resetAuthor();
      resetUrl();
      dispatch(
        setNotification(
          {
            message: `a new blog ${blogObj.title} by ${blogObj.author} added`,
            color: 'green',
          },
          5000
        )
      );
    } catch (e) {
      dispatch(
        setNotification(
          {
            message: `blog ${blogObj.title} due to: ${e.response.data.error}`,
            color: 'red',
          },
          5000
        )
      );
    }
  };

  return (
    <>
      <h2>create new</h2>
      <section>
        <form onSubmit={handleCreateBlog}>
          <div>
            <TextField
              variant='filled'
              label='Title'
              id='title'
              name='title'
              {...title}
            />
          </div>
          <div>
            <TextField
              variant='filled'
              label='Author'
              id='author'
              name='author'
              {...author}
            />
          </div>
          <div>
            <TextField
              variant='filled'
              label='URL'
              id='url'
              name='url'
              {...url}
            />
          </div>
          <Button variant='contained' color='primary' type='submit'>
            Create
          </Button>
        </form>
      </section>
    </>
  );
};

export default BlogForm;
