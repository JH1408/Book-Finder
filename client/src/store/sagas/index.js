import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {searchBooksSaga} from './book';
import {authUserSaga} from './auth';


export function* watchBook() {
  yield takeEvery(actionTypes.SEARCH_BOOKS, searchBooksSaga);
}

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
}
