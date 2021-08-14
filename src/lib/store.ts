import localForage from 'localforage';

export const storeItem = async (key: string, value: any) => {
  return await localForage.setItem(key, value);
};

export const fetchItem = async (key: string): Promise<[]> => {
  return (await localForage.getItem(key)) || [];
};

export const clearItems = async () => await localForage.clear();
