import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import './config/firebase-config';
import App from './App';
import './index.css';

const link = new HttpLink({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://pacific-caverns-31987.herokuapp.com/'
      : 'http://localhost:4000/login',
  credentials: 'include',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
