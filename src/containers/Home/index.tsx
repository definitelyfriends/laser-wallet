import React from 'react';
import DisplayHNT from 'src/components/DisplayHNT';
import HomeTop from 'src/components/HomeTop'

const Home: React.FC = () => {
  return (
    <div>
      <HomeTop />
      <DisplayHNT />
    </div>
  );
};

export default Home;
