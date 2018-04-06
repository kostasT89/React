/* eslint no-undef:0 import/imports-first:0 */

import 'babel-polyfill';
import './index.html';
import './scss/app.scss';
import './styl/app.styl';
// Sprite stuff
import './assets/spritesmith-generated/sprite.png';
import 'font-awesome-webpack';

import React from 'react';
import isString from 'lodash/isString';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer as HotLoaderAppContainer } from 'react-hot-loader';

import { setFisecalApiUrl } from './utils/localStorageUtils';
import config from './config/config';
import Root from './containers/Root';
import getConfigRequest from './api/configApi';
import configureStore from './store/configureStore';

import PageLoading from './components/PageLoading/PageLoading';

window.fisecalAppConfig = config;

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const rootEl = document.getElementById('app');

render(<PageLoading />, rootEl);

// eslint-disable-next-line wrap-iife
(async function renderApplication() {
  const configData = await getConfigRequest();

  setFisecalApiUrl(configData.apiUrl);

  render(
    <HotLoaderAppContainer>
      <Root store={store}
            history={history} />
    </HotLoaderAppContainer>,
    rootEl
  );

  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      const NewApp = require('./containers/Root').default; // eslint-disable-line global-require

      render(
        <HotLoaderAppContainer>
          <NewApp store={store}
                  history={history} />
        </HotLoaderAppContainer>,
        rootEl
      );
    });
  }

  /* TODO: Remove this when react-hot-loader is offically fixed
   * Warning from React Router, caused by react-hot-loader.
   * The warning can be safely ignored, so filter it from the console.
   * Otherwise you'll see it every time something changes.
   * See https://github.com/gaearon/react-hot-loader/issues/298
   */
  if (module.hot) {
    const orgError = console.error; // eslint-disable-line no-console
    console.error = (...args) => { // eslint-disable-line no-console
      if (args && args.length === 1 &&
        isString(args[0]) && args[0].indexOf('You cannot change <Router routes>;') > -1) {
        // React route changed
      }
      else {
        // Log the error as normally
        orgError.apply(console, args);
      }
    };
  }
})();
