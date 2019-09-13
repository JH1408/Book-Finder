import React, {useState} from 'react';
import axios from 'axios';

const Search = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState();

  const inputChangedHandler = (event) => {
    setInputValue(event.target.value);
  }

  const searchHandler = (event) => {
    event.preventDefault();
    const searchQuery = inputValue.replace(/\s/g, '+')

    axios.get(`http://localhost:3001/books/search/${searchQuery}`)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <React.Fragment>
      <form>
        <input type="text" name="search" onChange={(event) => inputChangedHandler(event)} value={inputValue}/>
        <button onClick={(event) => searchHandler(event)}>Search</button>
      </form>
    </React.Fragment>
  )
};

export default Search;
