import localForage from 'localforage';

export const storeItem = async (key: any, value: any) => {
  return await localForage.setItem(key, value);
};

export const fetchItem = async (key: any) => {
  return await localForage.getItem(key);
};
