import React from 'react';
import {useSelector} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

const BookList = (props) => {

  const books = useSelector(state => {
    return state.book.books;
  });

  const loading = useSelector(state => {
    return state.book.loading;
  });
    let bookList = <Spinner />;
  if (!loading) {
    if(books.length>1){
      console.log(books)

      bookList = books.map(book => {
        let img = null
        if (typeof book.volumeInfo.imageLinks !== 'undefined') {
          img = <img src={book.volumeInfo.imageLinks.thumbnail} alt=""/>
        }
        return (
            <div key={book.id}>
              {img}
              <h2>{book.volumeInfo.title}</h2>
              <p>{book.volumeInfo.authors}</p>
              <a href={book.volumeInfo.previewLink} target="_blank"><button>View Book</button></a>
            </div>
          )
        })
    } else {
      bookList = <h2>Start searching for books.</h2>
    }
  }

    return (
      <div>
        {bookList}
      </div>
    );
  }

export default BookList;
