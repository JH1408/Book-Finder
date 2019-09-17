import React, {useEffect} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {useDispatch} from 'react-redux';
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
