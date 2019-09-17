import React from 'react';
import {Link} from 'react-router-dom';
import classes from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={classes.NotFound}>
      <h1>404</h1>
      <Link to="/">Go back home</Link>
    </div>

  )
};

export default NotFound;
