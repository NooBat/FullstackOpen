import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { CookiesProvider } from 'react-cookie';

import './config/firebase-config';
import App from './App';
import './index.css';

const link = new HttpLink({
  uri: 'http://localhost:4000',
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
    <CookiesProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </CookiesProvider>
  </React.StrictMode>
);
