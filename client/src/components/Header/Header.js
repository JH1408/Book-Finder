import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import classes from './Header.module.css';
import Logout from './Logout/Logout';
import ToggleIcon from '../Header/ToggleIcon/ToggleIcon';
import Backdrop from '../UI/Backdrop/Backdrop';
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

  const error = useSelector(state => {
    return state.book.error
  });

  const errorType = useSelector(state => {
    return state.book.errorType;
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

  let errorMessage = null;
  if(error && errorType === 'Already saved') {
    errorMessage = (
      <p className={classes.Error}>Book is already saved.</p>
    )
  } else if(error) {
    errorMessage = (
      <p className={classes.Error}>Something went wrong. Please try again.</p>
    )
  }

  let attachedClasses = [classes.Menu, classes.Closed];
  if(props.show) {
    attachedClasses = [classes.Menu, classes.Open];
  }

  return (
    <React.Fragment>
      <nav className={classes.Nav}>
        <div className={classes.Logo}>
          <NavLink className={classes.NavItem} exact to="/">Book Finder</NavLink>
        </div>
        {logoutMessage}
        <ToggleIcon clicked={props.toggle} show={props.show}/>
        <Backdrop show={props.show} clicked={props.hide}/>
        <div className={attachedClasses.join(' ')}>
          <NavLink className={classes.NavItem} exact to="/books" onClick={props.hide}>Saved Books</NavLink>
          <button onClick={props.clicked}>{isAuth ? 'Log Out' : 'Sign Up'}</button>
        </div>
      </nav>
      <h1 className={classes.Header}>Book Finder</h1>
      {errorMessage}
    </React.Fragment>
  )
}

export default Header;
