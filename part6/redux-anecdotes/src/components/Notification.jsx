import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return notification ? (
    <div key={(Math.random() * 10000).toFixed(0)} style={style}>
      {notification}
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  notification: state.notification,
});

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
