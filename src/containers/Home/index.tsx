import React, { Suspense, useState } from 'react';
import { useRecoilValue } from 'recoil';
import HomeTop from 'components/HomeTop';
import pathState, { PathStateEnum } from 'src/state/pathState';
import { useStored } from 'hooks/useStored';

const Splash = React.lazy(() => import('containers/Splash'));
const Assets = React.lazy(() => import('components/Assets'));
const History = React.lazy(() => import('components/History'));
const Hotspots = React.lazy(() => import('components/Hotspots'));
const Settings = React.lazy(() => import('containers/Settings'));
const ImportSeed = React.lazy(() => import('containers/ImportSeed'));
const SignIn = React.lazy(() => import('containers/SignIn'));

const Home: React.FC = () => {
  const path = useRecoilValue(pathState);
  const [loggedIn, setLoggedIn] = useState(false);

  useStored().then(setLoggedIn);

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        {path === PathStateEnum.root && <Splash />}
        {path === PathStateEnum.import && <ImportSeed />}
        {path === PathStateEnum.signin && <SignIn />}
        {(path === PathStateEnum.assets || loggedIn) && (
          <>
            <HomeTop />
            <Assets />
          </>
        )}
        {path === PathStateEnum.history && <History />}
        {path === PathStateEnum.hotspots && <Hotspots />}
        {path === PathStateEnum.settings && <Settings />}
      </Suspense>
    </>
  );
};

export default Home;
