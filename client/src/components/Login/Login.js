import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Backdrop from '../UI/Backdrop/Backdrop';
import Spinner from '../UI/Spinner/Spinner';
import classes from './Login.module.css';
import * as actions from '../../store/actions/index';

const Login = (props) => {

  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);

  const dispatch = useDispatch();

  const loading = useSelector(state => {
    return state.auth.loading;
  });

  const error = useSelector(state => {
    return state.auth.error;
  });

  const setIsSignedUpHandler = () => {
    setIsSignedUp(!isSignedUp);
  }

  let loginForm = <Spinner />;
  if (!loading) {
    loginForm = (
      <React.Fragment>
        <form>
          <label>Email Address</label>
          <input type="email" placeholder="Email Address" name="email" onChange={(event) => emailChangedHandler(event)} value={emailValue} required/>
          <label>Password</label>
          <input type="password"  placeholder="Password" name="password" onChange={(event) => passwordChangedHandler(event)} value={passwordValue} required/>
          <button onClick={(event) => submitHandler(event)}>{isSignedUp ? 'Sign In' : 'Sign Up'}</button>
        </form>
        <p>Already have an account?<span> </span>
          <span
            style={{textDecoration: "underline", cursor: "pointer"}}
            onClick={setIsSignedUpHandler}>{!isSignedUp ? 'Sign In' : 'Sign Up'}</span>
        </p>
      </React.Fragment>
    )
  }

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(actions.auth(emailValue, passwordValue, isSignedUp));
  }

  const emailChangedHandler = (event) => {
    setEmailValue(event.target.value);
  }
  const passwordChangedHandler = (event) => {
    setPasswordValue(event.target.value);
  }

  let message = null;
  if(error & isSignedUp) {
    message = (
      <p className={classes.errorMessage}>Incorrect username or password.</p>
    );
  } else if(error) {
    message = (
      <p className={classes.errorMessage}>Sorry, something went wrong. Please try again.</p>
    )
  }

  return (
    <React.Fragment>
      <Backdrop show={props.visible} clicked={props.hide}/>
        <div className={classes.LoginModal}
          style={{
          transform: props.visible ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.visible ? '1' : '0'
        }}>
          <h2>{isSignedUp ? 'Sign In' : 'Sign Up'}</h2>
          {message}
          {loginForm}
        </div>
    </React.Fragment>
  )
}

export default Login;
