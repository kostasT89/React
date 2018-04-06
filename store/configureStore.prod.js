
import { createStore, applyMiddleware } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import thunkMiddleware from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

const router = routerMiddleware(browserHistory);

const enhancer = applyMiddleware(thunkMiddleware, router);

export default function configureStore(initialState) {
  return createStore(enableBatching(rootReducer), initialState, enhancer);
}
