import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './Search.module.css';

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

  return (
    <React.Fragment>
      <form className={classes.SearchForm}>
        <input className={classes.SearchInput} type="search" name="search" onChange={(event) => inputChangedHandler(event)} value={inputValue}/>
        <button className={classes.SearchButton} onClick={(event) => searchBooks(event)}>Search</button>
      </form>
    </React.Fragment>
  )
};

export default Search;
