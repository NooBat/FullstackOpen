const Notification = ({ error }) =>
  error ? <div style={{ color: 'red' }}>{error}</div> : null;

export default Notification;
