import React from 'react';
import classes from './ToggleIcon.module.css';

const ToggleIcon = (props) => {

  let attachedClasses = [classes.ToggleIcon];
  if(props.show) {
    attachedClasses = [classes.ToggleIcon, classes.change];
  }

  return (
    <div className={attachedClasses.join(' ')} onClick={props.clicked}>
      <div className={classes.bar1}></div>
      <div className={classes.bar2}></div>
      <div className={classes.bar3}></div>
    </div>
  )
};

export default ToggleIcon;
