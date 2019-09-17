import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import classes from './Header.module.css';
import Logout from './Logout/Logout';
import * as actions from '../../store/actions/index';

const Header = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();

  const isAuth = useSelector(state => {
    return state.auth.token !== null
  });

  const message = useSelector(state => {
    return state.auth.logoutSuccess
  });

  useEffect(() => {
    if(message) {
      setIsVisible(true);
    }
  }, [message])

  let logoutMessage = null;
  if(isVisible) {
    logoutMessage = <Logout/>
    setTimeout(() => {
      setIsVisible(false);
      dispatch(actions.deleteMessage());
    }, 1000);
  }

  return (
    <React.Fragment>
      <nav className={classes.Nav}>
        <div>
          <NavLink className={classes.NavItem} exact to="/">Book Finder</NavLink>
        </div>
        {logoutMessage}
        <div>
          <NavLink className={classes.NavItem} exact to="/books">Saved Books</NavLink>
          <button onClick={props.clicked}>{isAuth ? 'Log Out' : 'Sign Up'}</button>
        </div>
      </nav>
      <h1 className={classes.Header}>Book Finder</h1>
    </React.Fragment>
  )
}

export default Header;
