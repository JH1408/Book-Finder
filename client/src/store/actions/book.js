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

export const fetchBooks = (token, userId) => {
  return {
    type: actionTypes.FETCH_BOOKS,
    token: token,
    userId: userId
  };
};

export const fetchBooksSuccess = (books) => {
  return {
    type: actionTypes.FETCH_BOOKS_SUCCESS,
    books: books
  };
};

export const fetchBooksFail = (error) => {
  return {
    type: actionTypes.FETCH_BOOKS_FAIL,
    error: error
  };
};

export const fetchBooksStart = () => {
  return {
    type: actionTypes.FETCH_BOOKS_START
  };
};

export const saveBooks = (title, author, img, link, owner, token) => {
  return {
    type: actionTypes.SAVE_BOOKS,
    title: title,
    author: author,
    img: img,
    link: link,
    owner: owner,
    token: token
  };
};

export const saveBooksSuccess = () => {
  return {
    type: actionTypes.SAVE_BOOKS_SUCCESS,
  };
};

export const saveBooksFail = (error) => {
  return {
    type: actionTypes.SAVE_BOOKS_FAIL,
    error: error
  };
};

export const saveBooksStart = () => {
  return {
    type: actionTypes.SAVE_BOOKS_START
  };
};

export const removeBooks = (bookId, token, owner) => {
  return {
    type: actionTypes.REMOVE_BOOKS,
    bookId: bookId,
    token: token,
    owner: owner
  };
};

export const removeBooksSuccess = () => {
  return {
    type: actionTypes.REMOVE_BOOKS_SUCCESS,
  };
};

export const removeBooksFail = (error) => {
  return {
    type: actionTypes.REMOVE_BOOKS_FAIL,
    error: error
  };
};

export const removeBooksStart = () => {
  return {
    type: actionTypes.REMOVE_BOOKS_START
  };
};
