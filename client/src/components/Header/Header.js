import React from 'react';
import classes from './Header.module.css';

const Header = (props) => {

  return (
    <React.Fragment>
      <nav className={classes.Nav}>
        <button onClick={props.clicked}>Sign Up</button>
      </nav>
      <h1 className={classes.Header}>Book Finder</h1>
    </React.Fragment>
  )
}

export default Header;
