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

if (rootElement.hasChildNodes()) {
  serviceWorker.register();
}
