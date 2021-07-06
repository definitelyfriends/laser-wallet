import React, { Suspense } from 'react';
import DisplayHNT from 'components/DisplayHNT';
import HomeTop from 'components/HomeTop';
import HorizontalMenu from 'components/HorizontalMenu';
import pathState from 'src/state/pathState';
import { useRecoilValue } from 'recoil';

const Assets = React.lazy(() => import('components/Assets'));

const Home: React.FC = () => {
  const path = useRecoilValue(pathState);

  console.log(path);

  return (
    <div>
      <HomeTop />
      <HorizontalMenu />
      <DisplayHNT />
      {path === 'assets' && (
        <Suspense fallback={<div>loading...</div>}>
          <Assets />
        </Suspense>
      )}
      {path === 'history' && 'history'}
      {path === 'hotspots' && 'hotspots'}
    </div>
  );
};

export default Home;
