import React, {Suspense, useEffect} from 'react';
import {Route, withRouter, Redirect, Switch} from 'react-router-dom';
import Homepage from './containers/Layout/Homepage';
import FavoriteBooks from './containers/Layout/FavoriteBooks';

const routes = (
  <Switch>
    <Route path="/books" component={FavoriteBooks} />
    <Route path="/" exact component={Homepage} />
  </Switch>
);


const App = () => {
  return (
    <div>
      {routes}
    </div>
  );
}

export default App;
