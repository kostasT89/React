import { createStore, applyMiddleware, compose } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { persistState } from 'redux-devtools'; // eslint-disable-line
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(browserHistory);

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

const enhancer = compose(
  applyMiddleware(thunkMiddleware, router, logger),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
);

export default function configureStore(initialState) {
  const store = createStore(enableBatching(rootReducer), initialState, enhancer);
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(require('../reducers')); // eslint-disable-line
    });
  }
  return store;
}
