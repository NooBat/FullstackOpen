import React from 'react';
import { useSelector } from 'react-redux';

const notificationSelector = (state) => state.notification;

const Notification = () => {
  const notifications = useSelector(notificationSelector);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return notifications.length
    ? notifications.map((notification) => (
      <div key={(Math.random() * 10000).toFixed(0)} style={style}>
        {notification}
      </div>
    ))
    : null;
};

export default Notification;
