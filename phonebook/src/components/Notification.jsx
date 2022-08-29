const Notification = ({ notification }) => {
  const style = {
    backgroundColor: 'lightgray',
    color: notification.color,
    fontSize: 23,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: 'green',
    padding: 10,
    marginBottom: 10,
  };

  if (!notification) {
    return null;
  }
  return <div style={style}>{notification.message}</div>;
};

export default Notification;
