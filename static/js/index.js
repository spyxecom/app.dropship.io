import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import './i18n';

store()
  .then((s) => {
    ReactDOM.render(<App store={s} />, document.getElementById('root'));
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err.message);
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
