import { atom } from 'recoil';

export enum PathStateEnum {
  empty = '',
  root = 'root',
  import = 'import',
  password = 'password',
  assets = 'assets',
  hotspots = 'hotspots',
  history = 'history',
  settings = 'settings',
  signin = 'signin',
}

export default atom<PathStateEnum>({ key: 'path', default: PathStateEnum.empty });
