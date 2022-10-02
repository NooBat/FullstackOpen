import { useEffect, useState } from 'react';

import { Alert } from '@mui/material';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { useNotification } from './hooks';

const App = () => {
  const [page, setPage] = useState('authors');
  const [notification, setNotification] = useNotification();
  const [token, setToken] = useState();

  useEffect(() => {
    const t = localStorage.getItem('library-user-token');
    if (t) {
      setToken(t);
    }
  }, []);

  if (!token) {
  }

  return (
    <div>
      {notification ? (
        <Alert severity={notification.severity}>{notification.message}</Alert>
      ) : null}
      <div>
        <button type='button' onClick={() => setPage('authors')}>
          authors
        </button>
        <button type='button' onClick={() => setPage('books')}>
          books
        </button>
        <button type='button' onClick={() => setPage('add')}>
          add book
        </button>
      </div>

      <Authors show={page === 'authors'} handleNotification={setNotification} />

      <Books show={page === 'books'} handleNotification={setNotification} />

      <NewBook show={page === 'add'} handleNotification={setNotification} />
    </div>
  );
};

export default App;
