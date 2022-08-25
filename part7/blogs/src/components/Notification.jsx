import React from 'react';

const Notification = ({ notification }) => (notification ? (
  <div
    className='notification'
    style={{
      backgroundColor: 'rgb(203, 213, 225)',
      margin: '10px auto',
      width: '80vw',
      height: 'fit-content',
      borderRadius: '10px',
      border: `3px solid ${notification.color}`,
      boxSizing: 'border-box',
    }}
  >
    <p
      style={{
        color: `${notification.color}`,
        margin: '20px 2vw',
        fontSize: '120%',
      }}
    >
      {notification.message}
    </p>
  </div>
) : null);

export default Notification;
