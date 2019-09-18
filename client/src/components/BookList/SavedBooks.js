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

  const isAuth = useSelector(state => {
    return state.auth.token !== null
  });

  const dispatch = useDispatch();

  const {unauthenticated} = props;

  useEffect(()=> {
    if(isAuth) {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      dispatch(actions.fetchBooks(token, userId))
    } else {
      unauthenticated();
    }
  }, [dispatch, isAuth, unauthenticated])

  const removeBooksHandler = (event, bookId) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    dispatch(actions.removeBooks(bookId, token, userId));
  }

  let bookList = <Spinner />;
  if (!loading) {
    if(books){
      bookList = books.map(book => {
        let img = null
        if (book.img !== null) {
          img = <img src={book.img} alt=""/>
        }
        return (
            <div className={classes.Card} key={book._id}>
              {img}
              <div className={classes.Info}>
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <a href={book.link} target="_blank" rel="noopener noreferrer"><button>View Book</button></a>
                <button onClick={(event) => removeBooksHandler(event, book._id)}>Remove Book</button>
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
