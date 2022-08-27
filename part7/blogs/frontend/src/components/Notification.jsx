import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return notification ? (
    <Alert severity={notification.color === 'green' ? 'success' : 'error'}>
      {notification.message}
    </Alert>
  ) : null;
};

export default Notification;
