import localForage from 'localforage';

export const storeItem = (key: any, value: any) => {
  localForage
    .setItem(key, value)
    .then(function () {
      return localForage.getItem(key);
    })
    .then(function (value) {})
    .catch(function (err) {});
};
