import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { reducer, StateProvider } from './state';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StateProvider reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);
