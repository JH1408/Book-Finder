import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import classes from './Header.module.css';

const Header = (props) => {

  const isAuth = useSelector(state => {
    return state.auth.token !== null
  });

  return (
    <React.Fragment>
      <nav className={classes.Nav}>
        <div>
          <NavLink className={classes.NavItem} exact to="/">Book Finder</NavLink>
        </div>
        <div>
          <NavLink className={classes.NavItem} exact to="/books">Saved Books</NavLink>
          <button onClick={() => props.clicked}>{isAuth? 'Log Out' : 'Sign Up'}</button>
        </div>
      </nav>
      <h1 className={classes.Header}>Book Finder</h1>
    </React.Fragment>
  )
}

export default Header;
