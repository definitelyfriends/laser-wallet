import React, { Suspense } from 'react';
import { Route, MemoryRouter, Switch } from 'react-router-dom';
import Newtab from 'pages/Newtab/Newtab';
import { useStored } from 'hooks/useStored'

const Home = React.lazy(() => import('containers/Home'));

const Routes: React.FC = () => {
  const loadAccount = useStored();

  return (
    <MemoryRouter>
      <Switch>
        <Route exact path="/">
          <Suspense fallback={<div>Loading...</div>}>
            { loadAccount ? <Home /> : <Newtab /> }
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
