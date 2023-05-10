import React from 'react';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './redux/store';

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)
const container = document.getElementById('root');
const root = createRoot(container); 
root.render(app);
