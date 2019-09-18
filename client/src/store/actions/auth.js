import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const auth = (email, password, isSignedUp) => {
  return {
    type: actionTypes.AUTH_USER,
    email: email,
    password: password,
    isSignedUp: isSignedUp
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};

export const logoutMessage = () => {
  return {
    type: actionTypes.LOGOUT_MESSAGE
  };
};

export const deleteMessage = () => {
  return {
    type: actionTypes.DELETE_MESSAGE
  };
};

export const resetError = () => {
  return {
    type: actionTypes.RESET_ERROR
  };
};
