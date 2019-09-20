import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
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

  const touched = useSelector(state => {
    return state.book.touched;
  });

  const loading = useSelector(state => {
    return state.book.loading;
  });

  const error = useSelector(state => {
    return state.book.error;
  });

  const isAuth = useSelector(state => {
    return state.auth.token !== null
  });

  const [titleIsSaved, setTitleIsSaved] = useState(null);
  const [authorIsSaved, setAuthorIsSaved] = useState(null);

  const dispatch = useDispatch();

  const saveBooksHandler = (event, title, author, img, link) => {
    if(isAuth) {
      event.preventDefault();
      const token = localStorage.getItem('token');
      const owner = localStorage.getItem('userId');
      dispatch(actions.saveBooks(title, author, img, link, owner, token));
      setTitleIsSaved(title);
      setAuthorIsSaved(author);
    } else {
      props.unauthenticated();
    }
  }

  let bookList = <Spinner />;
  if (!loading) {
    if(books.length >= 1 && touched){
      bookList = books.map(book => {
        let img = null
        if (typeof book.volumeInfo.imageLinks !== 'undefined') {
          img = <img src={book.volumeInfo.imageLinks.thumbnail} alt=""/>
        }
        let author = book.volumeInfo.authors;
        if (book.volumeInfo.authors) {
          if(book.volumeInfo.authors.length > 1) {
          author =  `${book.volumeInfo.authors.join(', ').substring(0, 70)}...`
        }}
        let button = (
          <button onClick={(event) =>
              saveBooksHandler(event,
                                book.volumeInfo.title, author,
                                typeof book.volumeInfo.imageLinks !== 'undefined' ? book.volumeInfo.imageLinks.thumbnail : null,
                                book.volumeInfo.previewLink)}
            >Save Book</button>
        )
        if(titleIsSaved === book.volumeInfo.title && authorIsSaved === author && !error) {
          button = <p className={classes.Saved}>Successfully saved!</p>
        }

        return (
            <div className={classes.Card} key={book.id}>
              {img}
              <div className={classes.Info}>
                <h2>{book.volumeInfo.title}</h2>
                <p>{author}</p>
                <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer"><button>View Book</button></a>
                {button}
            </div>
            </div>
          )
        })
    } else {
      if(search & touched) {
        bookList = <h2 className={classes.start}>Sorry, no results for your search.</h2>
      } else {
        bookList = <h2 className={classes.start}>Start searching for books.</h2>
      }
    }
  }

  let loader = <Spinner/>;
  if(books.length < 10 || search || !touched) {
    loader = null;
  }

    return (
      <div className={classes.BookList}>
        <InfiniteScroll
            dataLength={books.length}
            next={props.search}
            hasMore={true}
            loader={loader}
            endMessage={<h2>Sorry, no more results available.</h2>}>
            {bookList}
        </InfiniteScroll>
      </div>
    );
  }


export default BookList;
