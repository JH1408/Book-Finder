import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utils/utility';

const initialState = {
  books: [],
  loading: false,
  savedBooks: []
};

const searchBooksStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const searchBooksSuccess = (state, action) => {
  return updateObject(state, {
    books: action.books,
    loading: false
  });
};

const searchBooksFail = (state, action) => {
  return updateObject(state, {loading: false});
};

const fetchBooksStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchBooksSuccess = (state, action) => {
  return updateObject(state, {
    savedBooks: action.books,
    loading: false
  });
};

const fetchBooksFail = (state, action) => {
  return updateObject(state, {loading: false});
};

const saveBooksStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const saveBooksSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    savedBooks: action.books
  });
};

const saveBooksFail = (state, action) => {
  return updateObject(state, {loading: false});
};

const removeBooksStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const removeBooksSuccess = (state, action) => {
  return updateObject(state, {loading: false});
};

const removeBooksFail = (state, action) => {
  return updateObject(state, {loading: false});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_BOOKS_START: return searchBooksStart(state, action);
    case actionTypes.SEARCH_BOOKS_SUCCESS: return searchBooksSuccess(state, action);
    case actionTypes.SEARCH_BOOKS_FAIL: return searchBooksFail(state, action);
    case actionTypes.FETCH_BOOKS_START: return fetchBooksStart(state, action);
    case actionTypes.FETCH_BOOKS_SUCCESS: return fetchBooksSuccess(state, action);
    case actionTypes.FETCH_BOOKS_FAIL: return fetchBooksFail(state, action);
    case actionTypes.SAVE_BOOKS_START: return saveBooksStart(state, action);
    case actionTypes.SAVE_BOOKS_SUCCESS: return saveBooksSuccess(state, action);
    case actionTypes.SAVE_BOOKS_FAIL: return saveBooksFail(state, action);
    case actionTypes.REMOVE_BOOKS_START: return removeBooksStart(state, action);
    case actionTypes.REMOVE_BOOKS_SUCCESS: return removeBooksSuccess(state, action);
    case actionTypes.REMOVE_BOOKS_FAIL: return removeBooksFail(state, action);
    default: return state;
  }
};

export default reducer;
