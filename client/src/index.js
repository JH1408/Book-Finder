import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import createSagaMiddleware from 'redux-saga';
import bookReducer from './store/reducers/book';
import authReducer from './store/reducers/auth';
import {watchBook} from './store/sagas/index';
import {watchAuth} from './store/sagas/index';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  book: bookReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchBook);
sagaMiddleware.run(watchAuth);

const app = (
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
