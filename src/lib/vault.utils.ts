import { split, map } from 'ramda';
import * as buffer from 'buffer';
import { Keypair, Mnemonic } from '@helium/crypto';

const KEY_TYPE = 'ed25519';

const Buffer = buffer.Buffer;

export const lowercase = (word: string) => word.toLowerCase();

export const convertToArray = (seedPhrase: string): string[] =>
  map(lowercase, split(' ', seedPhrase));

export const toBase64 = (key: Uint8Array): string => Buffer.from(key).toString('base64');

export const toBuffer = (key: string): Uint8Array => Buffer.from(key, 'base64');

export const getMnemonic = (publicKey: Buffer) => Mnemonic.fromEntropy(publicKey);

export const createKeypair = ({ pk, secretKey }: KeypairProps): Keypair => {
  const publicKey = toBuffer(pk);
  const privateKey = toBuffer(secretKey);

  return new Keypair({ publicKey, privateKey, keyType: KEY_TYPE });
};
