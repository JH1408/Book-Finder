import React from 'react';
import {useSelector} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './BookList.module.css'

const BookList = (props) => {

  const books = useSelector(state => {
    return state.book.books;
  });

  const loading = useSelector(state => {
    return state.book.loading;
  });
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
      bookList = <h2 className={classes.start}>Start searching for books.</h2>
    }
  }

    return (
      <div className={classes.BookList}>
        {bookList}
      </div>
    );
  }

export default BookList;
