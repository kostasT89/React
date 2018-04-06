import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import DevTools from './DevTools';
import routes from '../config/routes';
import { scrollToTopOfDiv } from '../utils/navigationUtils';
import { scrollableContentDivClassName } from '../config/properties';

const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <Router onUpdate={() => scrollToTopOfDiv(scrollableContentDivClassName)}
              history={history}
              routes={routes} />
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;
