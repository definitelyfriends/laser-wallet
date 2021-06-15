import React, { Suspense } from 'react';
import { Route, MemoryRouter, Switch } from 'react-router-dom';
import Newtab from 'pages/Newtab/Newtab';

const Home = React.lazy(() => import('containers/Home'));

const Routes: React.FC = () => {
  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/">
          <Newtab />
        </Route>
        <Route exact path="/home">
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        </Route>
      </Switch>
    </MemoryRouter>
  );
};

export default Routes;
