import { atom } from 'recoil';

export enum PathStateEnum {
  assets = 'assets',
  root = '',
  hotspots = 'hotspots',
  history = 'history',
  settings = 'settings',
}

export default atom<PathStateEnum>({ key: 'path', default: PathStateEnum.root });
