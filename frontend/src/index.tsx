import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

// Redux imports
import reducer from './store/reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

// Sagas
import { watchEmail } from './sagas/saga';

// Components
import App from './App';

// Setup redux store
const sagaMiddleware  = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchEmail);

ReactDOM.render(<Provider store={store}> <App/> </Provider>, document.getElementById('root'));
serviceWorker.unregister();
