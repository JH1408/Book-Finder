import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {searchBooksSaga} from './book';
import {fetchBooksSaga} from './book';
import {saveBooksSaga} from './book';
import {authUserSaga} from './auth';


export function* watchBook() {
  yield takeEvery(actionTypes.SEARCH_BOOKS, searchBooksSaga);
  yield takeEvery(actionTypes.FETCH_BOOKS, fetchBooksSaga);
  yield takeEvery(actionTypes.SAVE_BOOKS, saveBooksSaga);
}

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}
