import { useEffect, useState } from 'react';

import { Alert } from '@mui/material';
import { gql, useQuery } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import { useNotification } from './hooks';
import LoginForm from './components/LoginForm';

const ME = gql`
  query currentUser {
    me {
      username
      favouriteGenre
    }
  }
`;

const App = () => {
  const [page, setPage] = useState('authors');
  const [notification, setNotification] = useNotification();
  const [token, setToken] = useState(null);
  const [, setCurrentUser] = useState(null);
  const { error, data } = useQuery(ME, {
    skip: !token,
  });

  useEffect(() => {
    const t = localStorage.getItem('library-user-token');
    if (t) {
      setToken(t);
    }
  }, []);

  useEffect(() => {
    if (token && (data || error)) {
      if (data) {
        setCurrentUser(data.me);
        setNotification({
          message: `User ${data.me?.username} logged in`,
          severity: 'success',
        });
      } else if (error) {
        setCurrentUser(null);
        setNotification({
          message: error.graphQLErrors[0].message,
          severity: 'error',
        });
      }
    }
  }, [data]);

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
        {token ? (
          <>
            <button type='button' onClick={() => setPage('add')}>
              add book
            </button>
            <button
              type='button'
              onClick={() => {
                setToken(null);
                localStorage.removeItem('library-user-token');
              }}
            >
              log out
            </button>
          </>
        ) : (
          <button type='button' onClick={() => setPage('login')}>
            log in
          </button>
        )}
      </div>
      <Authors show={page === 'authors'} handleNotification={setNotification} />
      <Books show={page === 'books'} handleNotification={setNotification} />
      <NewBook show={page === 'add'} handleNotification={setNotification} />
      <LoginForm
        show={page === 'login'}
        handleNotification={setNotification}
        setToken={(t) => {
          setToken(t);
          setPage('authors');
        }}
      />
    </div>
  );
};

export default App;