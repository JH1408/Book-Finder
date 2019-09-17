import React, {Suspense, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Homepage from './containers/Layout/Homepage';
import FavoriteBooks from './containers/Layout/FavoriteBooks';
import NotFound from './components/404/NotFound';
import * as actions from './store/actions/index';

const routes = (
  <Switch>
    <Route path="/books" exact component={FavoriteBooks} />
    <Route path="/" exact component={Homepage} />
    <Route path="*" component={NotFound} />
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
