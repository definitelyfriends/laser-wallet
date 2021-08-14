declare global {
  interface Window {
    Buffer: any;
    localforage: any;
  }
}

declare module 'react-identicons';

window.Buffer = Buffer;
window.localforage = localforage;
