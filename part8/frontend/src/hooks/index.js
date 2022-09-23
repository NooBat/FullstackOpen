import { useState } from 'react';

const timeoutIds = [];

export const useNotification = () => {
  const [notification, setNotification] = useState();

  const setNotificationImproved = ({ message, severity }) => {
    clearTimeout(timeoutIds.shift());
    setNotification({ message, severity });
    timeoutIds.push(
      setTimeout(() => {
        setNotification(undefined);
      }, 10000)
    );
  };

  return [notification, setNotificationImproved];
};
