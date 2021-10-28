declare global {
  interface Window {
    Buffer: any;
    localforage: any;
  }
}

declare module 'react-identicons';
declare module '*.md';

window.Buffer = Buffer;
window.localforage = localforage;

interface StoredVault {
  address: string;
  privateKey: string;
  publicKey: string;
  walletName: string;
}

interface CreateVault {
  seedPhrase: string;
  walletName?: string;
}

type WatchAddress = {
  address: string;
  walletName?: string;
};

interface KeypairProps {
  pk: string;
  secretKey: string;
}
