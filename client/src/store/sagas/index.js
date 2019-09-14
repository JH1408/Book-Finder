import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {searchBooksSaga} from './book';


export function* watchBook() {
  yield takeEvery(actionTypes.SEARCH_BOOKS, searchBooksSaga);
}
