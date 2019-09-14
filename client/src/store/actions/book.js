import * as actionTypes from './actionTypes';

export const searchBooksSuccess = (books) => {
  return {
    type: actionTypes.SEARCH_BOOKS_SUCCESS,
    books: books
  };
};

export const searchBooksFail = (error) => {
  return {
    type: actionTypes.SEARCH_BOOKS_FAIL,
    error: error
  };
};

export const searchBooksStart = () => {
  return {
    type: actionTypes.SEARCH_BOOKS_START
  };
};

export const searchBooks = (inputValue) => {
  return {
    type: actionTypes.SEARCH_BOOKS,
    inputValue: inputValue
  };
};
