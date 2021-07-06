import React from 'react';
import styled from 'styled-components';
import pathState, { PathStateEnum } from 'src/state/pathState';
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

  const updateRoute = (path: string) => setPath(path as PathStateEnum);

  return (
    <Container>
      <div onClick={() => updateRoute(PathStateEnum.assets)}>Assets</div>
      <div onClick={() => updateRoute(PathStateEnum.history)}>History</div>
      <div onClick={() => updateRoute(PathStateEnum.hotspots)}>HotSpots</div>
    </Container>
  );
};

export default HorizontalMenu;
