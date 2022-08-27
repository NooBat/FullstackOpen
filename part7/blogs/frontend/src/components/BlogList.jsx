/* eslint-disable no-alert */
import { Link, List, ListItem } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

const blogSelector = (state) => {
  const sortedBlogsByLikes = [...state.blogs].sort((a, b) => b.likes - a.likes);
  return sortedBlogsByLikes;
};

const BlogList = () => {
  const blogs = useSelector(blogSelector);

  return (
    <List>
      {blogs.map((blog) => (
        <ListItem
          key={blog.id}
          sx={{
            border: '2px solid black',
            borderRadius: '10px',
            margin: '5px 0',
          }}
        >
          <Link
            component={RouterLink}
            to={`/blogs/${blog.id}`}
            underline='hover'
          >
            {blog.title} by {blog.author}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default BlogList;
