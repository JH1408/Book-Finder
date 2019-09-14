import React from 'react';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <React.Fragment>
      <h1 className={classes.header}>Book Finder</h1>
    </React.Fragment>
  )
}

export default Header;