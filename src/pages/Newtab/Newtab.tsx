// @ts-nocheck

import React from 'react';
import ImportSeed from 'containers/ImportSeed';
import logo from 'assets/img/logo.svg';
import './Newtab.css';
import './Newtab.scss';

const Newtab: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ImportSeed />
      </header>
    </div>
  );
};

export default Newtab;
