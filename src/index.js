import React from 'react';
import { hydrate, render } from 'react-dom';
import { loadComponents, getState } from 'loadable-components';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.scss';

window.snapSaveState = () => getState();

const rootElement = document.getElementById('root');
loadComponents()
  .then(() => hydrate(<App />, rootElement))
  .catch(() => render(<App />, rootElement));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
