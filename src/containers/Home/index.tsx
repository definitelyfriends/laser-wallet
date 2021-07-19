import React, { Suspense } from 'react';
import HomeTop from 'components/HomeTop';
import pathState, { PathStateEnum } from 'src/state/pathState';
import { useRecoilValue } from 'recoil';

const Assets = React.lazy(() => import('components/Assets'));
const History = React.lazy(() => import('components/History'));
const Hotspots = React.lazy(() => import('components/Hotspots'));
const Settings = React.lazy(() => import('containers/Settings'));

const Home: React.FC = () => {
  const path = useRecoilValue(pathState);

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        {(path === 'assets' || path === PathStateEnum.root) && (
          <>
            <HomeTop />
            <Assets />
          </>
        )}
        {path === 'history' && <History />}
        {path === 'hotspots' && <Hotspots />}
        {path === 'settings' && <Settings />}
      </Suspense>
    </>
  );
};

export default Home;
