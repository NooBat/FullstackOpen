import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
  };

  return (
    <>
      <h2>create new</h2>
      <section>
        <form onSubmit={handleCreateBlog}>
          <div>
            <label htmlFor='title'>
              Title:
              {' '}
              <input
                id='title'
                type='text'
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor='author'>
              Author:
              {' '}
              <input
                id='author'
                type='text'
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor='url'>
              URL:
              {' '}
              <input
                id='url'
                type='url'
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </label>
          </div>
          <button type='submit'>Create</button>
        </form>
      </section>
    </>
  );
};

export default BlogForm;
