import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {searchBooksSaga} from './book';
import {fetchBooksSaga} from './book';
import {saveBooksSaga} from './book';
import {removeBooksSaga} from './book';
import {authUserSaga} from './auth';
import {authCheckStateSaga} from './auth';
import {logoutSaga} from './auth';


export function* watchBook() {
  yield takeEvery(actionTypes.SEARCH_BOOKS, searchBooksSaga);
  yield takeEvery(actionTypes.FETCH_BOOKS, fetchBooksSaga);
  yield takeEvery(actionTypes.SAVE_BOOKS, saveBooksSaga);
  yield takeEvery(actionTypes.REMOVE_BOOKS, removeBooksSaga);
}

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}
