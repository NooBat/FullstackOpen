import { useEffect, useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { ME } from './queries';
import Recommendation from './components/Recommendation';

const timeoutIdList = [];

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [noti, setNoti] = useState(null);
  const client = useApolloClient();
  const result = useQuery(ME, {
    skip: !token,
    onError: (error) => {
      clearTimeout(timeoutIdList.shift());
      setNoti({ message: error.graphQLErrors[0].message, type: 'error' });
      timeoutIdList.push(
        setTimeout(() => {
          setNoti(null);
        }, 5000)
      );
    },
  });

  useEffect(() => {
    const tokenFromStorage = window.localStorage.getItem('library-user-token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    } else {
      setPage('login');
    }
  }, []);

  useEffect(() => {
    if (result.data) {
      clearTimeout(timeoutIdList.shift());
      setNoti({
        message: `user ${result.data.me.username} logged in`,
        type: 'success',
      });
      timeoutIdList.push(
        setTimeout(() => {
          setNoti(null);
        }, 5000)
      );
    }
  }, [result.data]);

  return (
    <div>
      <Notification notification={noti} />
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
            <button type='button' onClick={() => setPage('recommend')}>
              recommend
            </button>
            <button
              type='button'
              onClick={() => {
                setToken(null);
                window.localStorage.clear();
                client.clearStore();
              }}
            >
              logout
            </button>
          </>
        ) : (
          <button type='button' onClick={() => setPage('login')}>
            login
          </button>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook
        show={page === 'add'}
        setNotification={(notification) => {
          clearTimeout(timeoutIdList.shift());
          setNoti(notification);
          timeoutIdList.push(setTimeout(() => setNoti(null), 5000));
        }}
      />

      <Recommendation
        show={page === 'recommend'}
        genre={result.data ? result.data.me.favoriteGenre : null}
      />

      <LoginForm
        show={page === 'login'}
        setToken={(t) => {
          setToken(t);
          setPage('authors');
        }}
        setNotification={(notification) => {
          clearTimeout(timeoutIdList.shift());
          setNoti(notification);
          timeoutIdList.push(
            setTimeout(() => {
              setNoti(null);
            }, 5000)
          );
        }}
      />
    </div>
  );
};

export default App;
