import React, { Suspense, useState } from 'react';
import { Route, MemoryRouter, Redirect, Switch } from 'react-router-dom';
import Newtab from 'pages/Newtab/Newtab';
import { useStored } from 'hooks/useStored';

const Home = React.lazy(() => import('containers/Home'));

const Routes: React.FC = (props: any) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useStored().then(setLoggedIn);

  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/">
          <Suspense fallback={<div>Loading...</div>}>
            {loggedIn ? <Redirect to="/home" /> : <Newtab />}
          </Suspense>
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
