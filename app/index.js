import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import './app.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {ipcRenderer, remote} from 'electron';

const store = configureStore();
injectTapEventPlugin();

ipcRenderer.on('testtestes', (e, msg) => {
  console.log(msg);
  // const BrowserWindow = remote.BrowserWindow;
  // const window = new BrowserWindow({width: 400, height: 600});
  // window.on('closed', ()=>{window = null;});
})

render(
  <Provider store={store}>
    <Router>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
