import React, {useState} from 'react';
import classes from './Search.module.css';

const Search = (props) => {
  const [inputValue, setInputValue] = useState('');

  const inputChangedHandler = (event) => {
    setInputValue(event.target.value);
  }

  const searchHandler = (event, inputValue) => {
    event.preventDefault();
    props.search(inputValue);
  }

  return (
    <React.Fragment>
      <form className={classes.SearchForm}>
        <input className={classes.SearchInput} type="search" name="search" onChange={(event) => inputChangedHandler(event)} value={inputValue}/>
        <button className={classes.SearchButton} onClick={(event) => searchHandler(event, inputValue)}>Search</button>
      </form>
    </React.Fragment>
  )
};

export default Search;
