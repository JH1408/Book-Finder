import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './BookList.module.css';
import * as actions from '../../store/actions/index';

const SavedBooks = (props) => {

  const books = useSelector(state => {
    return state.book.savedBooks;
  });

  const loading = useSelector(state => {
    return state.book.loading;
  });

  const token = useSelector(state => {
    return state.book.token;
  });

  const userId = useSelector(state => {
    return state.book.userId;
  });

  const dispatch = useDispatch();

  useEffect(()=> {
    const token = localStorage.getItem('token');
    dispatch(actions.fetchBooks(token))
  }, [token, dispatch])

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
                <p>{book.volumeInfo.authors}</p>
                <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer"><button>View Book</button></a>
              </div>
            </div>
          )
        })
    } else {
      bookList = <h2 className={classes.start}>You don't have any saved books yet.</h2>
    }
  }

    return (
      <div className={classes.BookList}>
        <h2 className={classes.start}>Your saved books</h2>
        {bookList}
      </div>
    );
  }

export default SavedBooks;
