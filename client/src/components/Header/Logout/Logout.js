import React from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Logout.module.css';

const Logout = (props) => {

  return (
    <React.Fragment>
      <Backdrop show="true"/>
      <p className={classes.Logout}>You have been successfully logged out.</p>
    </React.Fragment>
  )
}

export default Logout;
