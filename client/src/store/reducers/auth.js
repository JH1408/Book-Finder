import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../utils/utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  logoutSuccess: false
};

const authStart = (state, action) => {
  return updateObject(state, {error: null, loading: true});
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    logoutSuccess: true
  });
};

const logoutMessage = (state, action) => {
  return updateObject(state, {
    logoutSuccess: false
  });
};

const deleteMessage = (state, action) => {
  return updateObject(state, {
    logoutSuccess: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.LOGOUT_MESSAGE: return logoutMessage(state, action);
    case actionTypes.DELETE_MESSAGE: return deleteMessage(state, action);
    default: return state;
  }
};

export default reducer;
