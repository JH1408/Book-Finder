import {put, delay, call} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url = `http://localhost:3001/users`;
  if (!action.isSignedup) {
    url = `http://localhost:3001/users/login`;
  }
  try {
    const response = yield axios.post(url , authData);
    yield localStorage.setItem('token', response.data[1]);
    yield localStorage.setItem('userId', response.data[0]._id);
    yield put(actions.authSuccess(response.data[1], response.data[0]._id));
  } catch(err) {
    yield put(actions.authFail(err));
  }
}
