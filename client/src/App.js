import React, {useEffect} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import Layout from './containers/Layout/Layout';
import NotFound from './components/404/NotFound';
import * as actions from './store/actions/index';

const routes = (
  <Switch>
    <Route path="/books" exact component={Layout} />
    <Route path="/" exact component={Layout} />
    <Route path="*" component={NotFound} />
  </Switch>
);

const App = () => {
  const dispatch = useDispatch();

  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    response => response,
    error => {
      const {status} = error.response;
      if (status === UNAUTHORIZED) {
        dispatch(actions.logout());
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);

  return (
    <div>
      {routes}
    </div>
  );
}

export default withRouter(App);
