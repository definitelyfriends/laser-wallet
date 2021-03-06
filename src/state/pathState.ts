import { atom } from 'recoil';

export enum PathStateEnum {
  empty = '',
  root = 'root',
  import = 'import',
  password = 'password',
  assets = 'assets',
  history = 'history',
  settings = 'settings',
  receive = 'receive',
}

export default atom<PathStateEnum>({ key: 'path', default: PathStateEnum.root });
