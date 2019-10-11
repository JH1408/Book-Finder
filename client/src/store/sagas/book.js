import axios from 'axios';
import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';

export function* searchBooksSaga(action) {
  yield put(actions.searchBooksStart());
  const searchQuery = action.inputValue.replace(/\s/g, '+');
  try {
    const response = yield axios.get(`/books/search?q=${searchQuery}&startIndex=1`);
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

export function* loadMoreBooksSaga(action) {
  yield put(actions.loadMoreBooksStart());
  try {
    const response = yield axios.get(`/books/search?q=${action.inputValue}&startIndex=${action.startIndex}`);
    const books = [];
    for (let key in response.data) {
      books.push({
        ...response.data[key],
        id: key + Math.random()});
      }
    yield put(actions.loadMoreBooksSuccess(books));
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
    link: action.link,
    owner: action.owner
  };
  try {
    const res = yield axios.post(`/books`, bookData, {headers: {'Authorization': action.token}});
    const savedBooks = [];
    const response = yield JSON.parse(res.config.data);
    savedBooks.push({...response});
    yield put(actions.saveBooksSuccess(savedBooks));
  } catch (e) {
    yield put(actions.saveBooksFail(e, e.response.data));
  }
}

export function* fetchBooksSaga(action) {
  yield put(actions.fetchBooksStart());
  try {
    const response = yield axios.get(`/books/${action.userId}`, {headers: {'Authorization': action.token}});
    const books = [];
    for (let key in response.data) {
      books.push({
        ...response.data[key],
        id: key});
      }
    yield put(actions.fetchBooksSuccess(books));
  } catch (e) {
    yield put(actions.fetchBooksFail(e));
  }
}

export function* removeBooksSaga(action) {
  yield put(actions.removeBooksStart());
  try {
    yield axios.delete(`/books/${action.owner}/${action.bookId}`, {headers: {'Authorization': action.token}});
    yield put(actions.removeBooksSuccess());
    yield put(actions.fetchBooks(action.token, action.owner));
  } catch (e) {
    yield put(actions.removeBooksFail(e));
  }
}
