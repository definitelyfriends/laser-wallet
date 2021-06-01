import { Keypair } from '@helium/crypto';
import { split, map } from 'ramda';
import CryptoES from 'crypto-es';
import localForage from 'localforage';
import { storeItem } from 'src/lib/store';

interface Vault {
  password: string;
  seedPhrase: string;
}

interface VaultFuncs {
  encrypt: (phrase: string, password: string) => string;
  decrypt: (password: string) => Promise<string>;
}

const lowercase = (word: string) => word.toLowerCase();

const convertToArray = (seedPhrase: string): string[] => {
  return map(lowercase, split(' ', seedPhrase));
};

const toBase64 = (key: Uint8Array): string => Buffer.from(key).toString('base64');

const createNewVault = async ({ password, seedPhrase }: Vault): Promise<void> => {
  const keypair = await Keypair.fromWords(convertToArray(seedPhrase));

  const privateKey = toBase64(keypair.privateKey);
  const publicKey = toBase64(keypair.publicKey);
  const address = keypair.address.b58;

  await storeItem('privateKey', encrypt(privateKey, password));
  await storeItem('publicKey', encrypt(publicKey, password));
  await storeItem('address', address);
};

const encrypt = (phrase: string, password: string): string => {
  return CryptoES.AES.encrypt(JSON.stringify(phrase), password).toString();
};

const decrypt = async (password: string): Promise<string> => {
  const stored: any = await localForage.getItem('privateKey');
  const decrypted = CryptoES.AES.decrypt(stored, password);

  return decrypted.toString(CryptoES.enc.Utf8);
};

const Vault = async ({ seedPhrase, password }: Vault): Promise<VaultFuncs> => {
  try {
    await createNewVault({ seedPhrase, password });
  } catch (error) {
    console.log(error);
  }

  return {
    encrypt,
    decrypt,
  };
};

export default Vault;
