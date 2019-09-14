import axios from 'axios';
import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* searchBooksSaga(action) {
  yield put(actions.searchBooksStart());
  const searchQuery = action.inputValue.replace(/\s/g, '+');
  try {
    const response = yield axios.get(`http://localhost:3001/books/search/${searchQuery}`);
    const books = [];
    for (let key in response.data) {
      books.push({
        ...response.data[key],
        id: key});
      }
    yield put(actions.searchBooksSuccess(books));
  } catch (e) {
    yield put(actions.searchBooksFail(e));
  }
}
