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

export function* saveBooksSaga(action) {
  yield put(actions.saveBooksStart());
  const bookData = {
    title: action.title,
    author: action.author,
    img: action.img,
    owner: action.owner,
    token: action.token
  };
  try {
    yield axios.post(`http://localhost:3001/books`, bookData);
    yield put(actions.saveBooksSuccess());
  } catch (e) {
    yield put(actions.saveBooksFail(e));
  }
}

export function* fetchBooksSaga(action) {
  yield put(actions.fetchBooksStart());
  try {
    const response = yield axios.post(`http://localhost:3001/books/${action.token}`, );
    const books = [];
    for (let key in response) {
      books.push({
        ...response[key],
        id: key});
      }
    yield put(actions.fetchBooksSuccess(books));
  } catch (e) {
    yield put(actions.fetchBooksFail(e));
  }
}
