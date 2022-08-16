import React, { useState } from 'react';

const Blog = ({
  blog, username, updateLikes, handleDelete,
}) => {
  const [visible, setVisible] = useState(false);

  const handleClickLike = () => {
    const newBlog = {
      ...blog,
      user: blog.user.id,
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
      style={{
        margin: '5px',
        padding: '10px',
        borderRadius: '10px',
        border: '3px solid black',
      }}
    >
      <article>
        {blog.title}
        {' '}
        {blog.author}
        {' '}
        <button type='button' onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'view'}
        </button>
      </article>
      <div style={{ display: visible ? '' : 'none' }}>
        <p style={{ margin: '10px 0 0 0' }}>{blog.url}</p>
        <p style={{ margin: '5px 0 0 0' }}>
          likes
          {' '}
          {blog.likes}
          {' '}
          <button type='button' onClick={handleClickLike}>
            like
          </button>
        </p>
        <p style={{ margin: '5px 0 0 0' }}>{blog.user.name}</p>
        {blog.user.username === username ? (
          <button style={{ margin: '5px 0 0 0' }} type='button' onClick={handleClickDelete}>
            remove
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default Blog;
