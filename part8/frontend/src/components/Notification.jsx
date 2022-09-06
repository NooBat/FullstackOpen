import { Alert } from '@mui/material';

const Notification = ({ notification }) =>
  notification ? (
    <Alert severity={notification.type}>{notification.message}</Alert>
  ) : null;

export default Notification;
