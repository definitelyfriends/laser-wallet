import { Keypair } from '@helium/crypto';
import CryptoES from 'crypto-es';
import localForage from 'localforage';
import { storeItem } from 'src/lib/store';
import { convertToArray, toBase64 } from './vault.utils';

interface Vault {
  password: string;
  seedPhrase: string;
}

export const createVault = async ({ password, seedPhrase }: Vault): Promise<boolean> => {
  const keypair = await Keypair.fromWords(convertToArray(seedPhrase));

  const privateKey = toBase64(keypair.privateKey);
  const publicKey = toBase64(keypair.publicKey);
  const address = keypair.address.b58;

  await storeItem('privateKey', encrypt(privateKey, password));
  await storeItem('publicKey', encrypt(publicKey, password));
  await storeItem('address', address);

  return true;
};

export const encrypt = (phrase: string, password: string): string => {
  return CryptoES.AES.encrypt(JSON.stringify(phrase), password).toString();
};

export const decrypt = async (password: string): Promise<string> => {
  const stored: any = await localForage.getItem('privateKey');
  const decrypted = CryptoES.AES.decrypt(stored, password);

  return decrypted.toString(CryptoES.enc.Utf8);
};
