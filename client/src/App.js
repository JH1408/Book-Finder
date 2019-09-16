import React, {Suspense, useEffect} from 'react';
import {Route, withRouter, Redirect, Switch} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Homepage from './containers/Layout/Homepage';
import FavoriteBooks from './containers/Layout/FavoriteBooks';
import * as actions from './store/actions/index'

const routes = (
  <Switch>
    <Route path="/books" component={FavoriteBooks} />
    <Route path="/" exact component={Homepage} />
  </Switch>
);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.authCheckState())
  }, [dispatch]);

  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
