/* eslint-disable react/destructuring-assignment */
import React from 'react';

const Notification = (noti) => (noti ? (
  <div
    style={{
      backgroundColor: 'rgb(203, 213, 225)',
      margin: '10px auto',
      width: '80vw',
      height: 'fit-content',
      borderRadius: '10px',
      border: `3px solid ${noti.color}`,
      boxSizing: 'border-box',
    }}
  >
    <p
      style={{
        color: `${noti.color}`,
        margin: '20px 2vw',
        fontSize: '120%',
      }}
    >
      {noti.message}
    </p>
  </div>
) : null);

export default Notification;
