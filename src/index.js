import React from 'react';
import ReactDOM  from 'react-dom';
import { Provider  } from 'react-redux';
import configureStore from './store/configureStore';
import {App} from './components';

import './styles/main.css';

const store = configureStore();
const appElement = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  appElement
);