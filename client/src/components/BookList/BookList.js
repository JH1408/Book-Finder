import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './BookList.module.css';
import * as actions from '../../store/actions/index';

const BookList = (props) => {

  const books = useSelector(state => {
    return state.book.books;
  });

  const search = useSelector(state => {
    return state.book.search;
  });

  const loading = useSelector(state => {
    return state.book.loading;
  });

  const isAuth = useSelector(state => {
    return state.auth.token !== null
  });

  const dispatch = useDispatch();


  const saveBooksHandler = (event, title, author, img, link) => {
    if(isAuth) {
      event.preventDefault();
      const token = localStorage.getItem('token');
      const owner = localStorage.getItem('userId');
      dispatch(actions.saveBooks(title, author, img, link, owner, token))
    } else {
      props.unauthenticated();
    }
  }

  let bookList = <Spinner />;
  if (!loading) {
    if(books.length >= 1){
      bookList = books.map(book => {
        let img = null
        if (typeof book.volumeInfo.imageLinks !== 'undefined') {
          img = <img src={book.volumeInfo.imageLinks.thumbnail} alt=""/>
        }
        return (
            <div className={classes.Card} key={book.id}>
              {img}
              <div className={classes.Info}>
                <h2>{book.volumeInfo.title}</h2>
                <p>{book.volumeInfo.authors.join(', ').length > 70 ? `${book.volumeInfo.authors.join(', ').substring(0, 70)}...` : book.volumeInfo.authors.join(', ')}</p>
                <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer"><button>View Book</button></a>
                <button onClick={(event) => saveBooksHandler(event, book.volumeInfo.title, book.volumeInfo.authors, book.volumeInfo.imageLinks.thumbnail, book.volumeInfo.previewLink)}>Save Book</button>
            </div>
            </div>
          )
        })
    } else {
      if(search) {
        bookList = <h2 className={classes.start}>Sorry, no results for your search.</h2>
      } else {
        bookList = <h2 className={classes.start}>Start searching for books.</h2>
      }
    }
  }

    return (
      <div className={classes.BookList}>
        {bookList}
      </div>
    );
  }

export default BookList;
