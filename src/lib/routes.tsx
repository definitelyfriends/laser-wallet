import React from 'react';
import { Route, MemoryRouter, Switch } from 'react-router-dom';
import Home from 'containers/Home';
import Newtab from 'pages/Newtab/Newtab';

const Routes: React.FC = () => {
  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/">
          <Newtab />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
    </MemoryRouter>
  );
};

export default Routes;
