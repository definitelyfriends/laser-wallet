import React, { Suspense } from 'react';
import DisplayHNT from 'components/DisplayHNT';
import HomeTop from 'components/HomeTop';
import HorizontalMenu from 'components/HorizontalMenu';
import pathState from 'src/state/pathState';
import { useRecoilValue } from 'recoil';

const Assets = React.lazy(() => import('components/Assets'));
const History = React.lazy(() => import('components/History'));
const Hotspots = React.lazy(() => import('components/Hotspots'));

const Home: React.FC = () => {
  const path = useRecoilValue(pathState);

  return (
    <div>
      <HomeTop />
      <HorizontalMenu />
      <DisplayHNT />
      <Suspense fallback={<div>loading...</div>}>
        {path === 'assets' && <Assets />}
        {path === 'history' && <History />}
        {path === 'hotspots' && <Hotspots />}
      </Suspense>
    </div>
  );
};

export default Home;
