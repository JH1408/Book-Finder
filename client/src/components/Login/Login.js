import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Backdrop from '../UI/Backdrop/Backdrop';
import Spinner from '../UI/Spinner/Spinner';
import classes from './Login.module.css';
import * as actions from '../../store/actions/index';
import {checkValidity, updateObject} from '../../utils/utility';

const Login = (props) => {

  const [email, setEmail] = useState({
    value: '',
    validation: {
      required: true,
      isEmail: true
    },
    isValid: false
  });

  const [password, setPassword] = useState({
    value: '',
    validation: {
      required: true,
      minLength: 7,
    },
    isValid: false
  });

  const [isSignedUp, setIsSignedUp] = useState(false);

  const [isValid, setIsValid] = useState(true);

  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const loading = useSelector(state => {
    return state.auth.loading;
  });

  const error = useSelector(state => {
    return state.auth.error;
  });

  useEffect(() => {
    if(error) {
      setIsError(true)
    };
    if(!props.visible) {
      const updatedEmail = updateObject(email, {
        value: '',
      });
      const updatedPassword = updateObject(password, {
        value: '',
      });
      setEmail(updatedEmail);
      setPassword(updatedPassword);
      setIsSignedUp(false);
      setIsValid(true);
      setIsError(false);
    }
  }, [error, props.visible]);

  const setIsSignedUpHandler = () => {
    setIsSignedUp(!isSignedUp);
    setIsValid(true);
    setIsError(false);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if(email.isValid && password.isValid) {
      dispatch(actions.auth(email.value, password.value, isSignedUp));
    } else if (isSignedUp) {
      dispatch(actions.auth(email.value, password.value, isSignedUp));
    } else {
      setIsValid(false)
    }
  }

  const emailChangedHandler = (event) => {
    const updatedEmail = updateObject(email, {
      value: event.target.value,
      isValid: checkValidity(event.target.value, email.validation),
    });
    setEmail(updatedEmail);
  }
  const passwordChangedHandler = (event) => {
    const updatedPassword = updateObject(password, {
      value: event.target.value,
      isValid: checkValidity(event.target.value, password.validation),
    });
    setPassword(updatedPassword);
  }

  let loginForm = <Spinner />;
  if (!loading) {
    loginForm = (
      <React.Fragment>
        <form>
          <label>Email Address</label>
          <input type="email" placeholder="Email Address" name="email" onChange={(event) => emailChangedHandler(event)} value={email.value} required/>
          <label>Password</label>
          <input type="password"  placeholder="Password" name="password" onChange={(event) => passwordChangedHandler(event)} value={password.value} required/>
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

  let message = null;
  if(isError && isSignedUp) {
    message = (
      <p className={classes.errorMessage}>Incorrect username or password.</p>
    );
  } else if(isError) {
    message = (
      <p className={classes.errorMessage}>Sorry, something went wrong. Please try again.</p>
    )
  }
  if (!isValid && !isSignedUp) {
    message = (
        <p className={classes.errorMessage}>Please enter a valid email address and a valid password. <br/> Passwords must consist of minimum 7 characters.</p>
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
