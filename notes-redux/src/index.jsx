import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
