import {put, call} from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../actions/index';


export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'userId');
  yield put(actions.logoutSucceed());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password
  };
  let url = `/users`;
  if (action.isSignedUp) {
    url = `/users/login`;
  }
  try {
    const response = yield axios.post(url , authData);
    const day = new Date();
    const expirationDate = day.setDate(day.getDate() + 5);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('token', response.data[1]);
    yield localStorage.setItem('userId', response.data[0]._id);
    yield put(actions.authSuccess(response.data[1], response.data[0]._id));
  } catch(err) {
    yield put(actions.authFail(err));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
    yield put(actions.logoutMessage());
  } else {
    const expirationDate = yield localStorage.getItem('expirationDate');
    const day = new Date();
    const today = day.setDate(day.getDate());
    if(expirationDate - today < 0) {
      yield put(actions.logout());
    } else {
      const userId = localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
    }
  }
}
