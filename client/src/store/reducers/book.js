import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utils/utility';

const initialState = {
  books: [],
  loading: false
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_BOOKS_START: return searchBooksStart(state, action);
    case actionTypes.SEARCH_BOOKS_SUCCESS: return searchBooksSuccess(state, action);
    case actionTypes.SEARCH_BOOKS_FAIL: return searchBooksFail(state, action);
    default: return state;
  }
};

export default reducer;
