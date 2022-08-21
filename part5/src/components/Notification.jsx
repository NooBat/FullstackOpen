import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ noti }) => (noti ? (
  <div
    className='notification'
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

Notification.propTypes = {
  noti: PropTypes.shape({
    message: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }),
};

Notification.defaultProps = {
  noti: null,
};

export default Notification;
