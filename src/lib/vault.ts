import { Keypair, Mnemonic } from '@helium/crypto';
import CryptoES from 'crypto-es';
import { storeItem, fetchItem } from 'src/lib/store';
import { convertToArray, toBase64 } from './vault.utils';
import JsonFormatter from './cryptoJsonFormatter';

// @ts-ignore
window.convertToArray = convertToArray;
// @ts-ignore
window.Keypair = Keypair;
// @ts-ignore
window.toBase64 = toBase64;
// @ts-ignore
window.Mnemonic = Mnemonic;

export const createVault = async ({ seedPhrase, walletName }: CreateVault): Promise<string> => {
  const existingVaults = await fetchItem('vaults');
  const salt = await fetchItem('salt');
  const keypair = await Keypair.fromWords(convertToArray(seedPhrase));

  const privateKey = toBase64(keypair.privateKey);
  const publicKey = toBase64(keypair.publicKey);
  const address = keypair.address.b58;

  const account = {
    privateKey: encryptKeys(privateKey, salt),
    publicKey: encryptKeys(publicKey, salt),
    address,
    walletName,
  };

  await storeItem('vaults', [...existingVaults, account].filter(Boolean));

  return address;
};

export const watchAddress = async ({ address, walletName }: WatchAddress) => {
  const existingVaults = await fetchItem('vaults');

  const account = {
    privateKey: null,
    publicKey: null,
    address,
    walletName,
  };

  await storeItem('vaults', [...existingVaults, account].filter(Boolean));

  return address;
};

export const createAccount = async (password: string) => {
  try {
    const salt = CryptoES.lib.WordArray.random(128 / 8).toString();
    await storeItem('salt', salt);

    const enc = CryptoES.AES.encrypt(password, salt, { format: JsonFormatter });
    await storeItem('enc', enc.toString());

    return true;
  } catch (e) {
    return new Error('Could not create account.');
  }
};

export const decryptAccount = async (password: string) => {
  const salt = await fetchItem('salt');
  const enc = await fetchItem('enc');

  /* @ts-ignore */
  const decrypted = CryptoES.AES.decrypt(enc, salt, { format: JsonFormatter }).toString(
    CryptoES.enc.Utf8
  );

  return decrypted === password;
};

// TODO: also not in use
// const decryptKey = async (key: string) => {
//   const salt = await fetchItem('salt');

//   return CryptoES.AES.decrypt(key, salt).toString(CryptoES.enc.Utf8);
// }

export const encryptKeys = (phrase: string, salt: string): string => {
  return CryptoES.AES.encrypt(JSON.stringify(phrase), salt).toString();
};
