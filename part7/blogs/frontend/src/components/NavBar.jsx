import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setNotification } from '../reducers/notificationReducer';
import { logoutUser } from '../reducers/userReducer';

import userService from '../services/user';

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    userService.clearUser();
    dispatch(
      setNotification(
        { message: `user ${user.name} logged out`, color: 'green' },
        5000
      )
    );
  };

  return (
    <header>
      {' '}
      <nav
        style={{
          backgroundColor: 'rgb(204, 204, 204)',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          borderRadius: '10px',
        }}
      >
        <Button component={Link} to='/' sx={{ minWidth: 100 }}>
          Blogs
        </Button>
        <Button component={Link} to='/users' sx={{ minWidth: 100 }}>
          Users
        </Button>
        <section>
          <p>
            {user.name} logged in <Button onClick={handleLogout}>Logout</Button>
          </p>
        </section>
      </nav>
    </header>
  );
};

export default NavBar;
