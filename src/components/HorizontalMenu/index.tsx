import React from 'react';
import styled from 'styled-components';
import pathState from 'src/state/pathState';
import { useRecoilState } from 'recoil';

const Container = styled.header`
  width: 100%;
  background-color: #272b4a;
  color: #ffffff;
  display: flex;
  padding-left: 2em;
`;

const HorizontalMenu: React.FC = () => {
  const [, setPath] = useRecoilState(pathState);

  const updateRoute = (path: string) => setPath(path);

  return (
    <Container>
      <div onClick={() => updateRoute('assets')}>Assets</div>
      <div onClick={() => updateRoute('history')}>History</div>
      <div onClick={() => updateRoute('hotspots')}>HotSpots</div>
    </Container>
  );
};

export default HorizontalMenu;
