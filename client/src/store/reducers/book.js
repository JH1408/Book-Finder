import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utils/utility';

const initialState = {
  books: [],
  loading: false,
  savedBooks: [],
  search: false,
  error: false,
  errorType: null
};

const searchBooksStart = (state, action) => {
    return updateObject(state, {
      loading: true,
      search: true,
      touched: true,
      error: false
  });
};

const loadMoreBooksStart = (state, action) => {
    return updateObject(state, {search: false});
};

const loadMoreBooksSuccess = (state, action) => {
  const books = [...state.books, ...action.books];
  return updateObject(state, {
    books: books,
  });
};

const searchBooksSuccess = (state, action) => {
  return updateObject(state, {
    books: action.books,
    loading: false,
    search: true,
    errorType: null
  });
};

const searchBooksFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  });
};

const fetchBooksStart = (state, action) => {
    return updateObject(state, {
      loading: true,
      error: false,
      touched: false
    });
};

const fetchBooksSuccess = (state, action) => {
  return updateObject(state, {
    savedBooks: action.savedBooks,
    loading: false
  });
};

const fetchBooksFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  });
};

const saveBooksStart = (state, action) => {
    return updateObject(state, {
      loading: true,
      error: false,
      errorType: null
    });
};

const saveBooksSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    savedBooks: action.savedBooks,
    errorType: null
  });
};

const saveBooksFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: true,
    errorType: action.errorType
  });
};

const removeBooksStart = (state, action) => {
    return updateObject(state, {
      loading: true,
      error: false,
    });
};

const removeBooksSuccess = (state, action) => {
  return updateObject(state, {loading: false});
};

const removeBooksFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: true
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_BOOKS_START: return searchBooksStart(state, action);
    case actionTypes.SEARCH_BOOKS_SUCCESS: return searchBooksSuccess(state, action);
    case actionTypes.SEARCH_BOOKS_FAIL: return searchBooksFail(state, action);
    case actionTypes.LOAD_MORE_BOOKS_START: return loadMoreBooksStart(state, action);
    case actionTypes.LOAD_MORE_BOOKS_SUCCESS: return loadMoreBooksSuccess(state, action);
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
