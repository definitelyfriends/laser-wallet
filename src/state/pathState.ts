import { atom } from 'recoil';

export enum PathStateEnum {
  root = '',
  import = 'import',
  assets = 'assets',
  hotspots = 'hotspots',
  history = 'history',
  settings = 'settings',
  signin = 'signin',
}

export default atom<PathStateEnum>({ key: 'path', default: PathStateEnum.root });
