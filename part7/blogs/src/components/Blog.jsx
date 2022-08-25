import React, { useState } from 'react';

const Blog = ({
  blog, username, updateLikes, handleDelete,
}) => {
  const [visible, setVisible] = useState(false);

  const handleClickLike = () => {
    const newBlog = {
      ...blog,
      user: blog.user ? blog.user.id : undefined,
      likes: blog.likes + 1,
    };

    updateLikes(newBlog);
  };

  const handleClickDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDelete(blog.id);
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

export default Blog;
