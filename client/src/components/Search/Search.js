import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from 'axios';

const Search = (props) => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  const searchBooks = (event) => {
    event.preventDefault();
    dispatch(actions.searchBooks(inputValue));
  }

  const inputChangedHandler = (event) => {
    setInputValue(event.target.value);
  }

  // const searchHandler = (event) => {
  //   event.preventDefault();
  //   const searchQuery = inputValue.replace(/\s/g, '+')
  //
  //   axios.get(`http://localhost:3001/books/search/${searchQuery}`)
  //   .then(response => {
  //     console.log(response);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }

  return (
    <React.Fragment>
      <form>
        <input type="search" name="search" onChange={(event) => inputChangedHandler(event)} value={inputValue}/>
        <button onClick={(event) => searchBooks(event)}>Search</button>
      </form>
    </React.Fragment>
  )
};

export default Search;
