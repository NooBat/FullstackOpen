import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore } from 'redux';

import reducer from './reducers/reducer';

const store = createStore(reducer);

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD',
    });
  };

  const ok = () => {
    store.dispatch({
      type: 'OK',
    });
  };

  const bad = () => {
    store.dispatch({
      type: 'BAD',
    });
  };

  const reset = () => {
    store.dispatch({
      type: 'ZERO',
    });
  };

  return (
    <div>
      <button type='button' onClick={good}>
        good
      </button>
      <button type='button' onClick={ok}>
        ok
      </button>
      <button type='button' onClick={bad}>
        bad
      </button>
      <button type='button' onClick={reset}>
        reset stats
      </button>
      <div>
        good
        <span>
          {' '}
          {store.getState().good}
        </span>
      </div>
      <div>
        ok
        <span>
          {' '}
          {store.getState().ok}
        </span>
      </div>
      <div>
        bad
        <span>
          {' '}
          {store.getState().bad}
        </span>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
