import { split, map } from 'ramda';

import * as buffer from 'buffer';
import { Keypair } from '@helium/crypto';
(window as any).Buffer = buffer.Buffer;

const KEY_TYPE = 'ed25519';

interface KeypairProps {
  pk: string;
  secretKey: string;
}

export const lowercase = (word: string) => word.toLowerCase();

export const convertToArray = (seedPhrase: string): string[] => {
  return map(lowercase, split(' ', seedPhrase));
};

export const toBase64 = (key: Uint8Array): string => Buffer.from(key).toString('base64');

export const toBuffer = (key: string): Uint8Array => Buffer.from(key, 'base64');

export const createKeypair = ({ pk, secretKey }: KeypairProps): Keypair => {
  const publicKey = toBuffer(pk);
  const privateKey = toBuffer(secretKey);

  return new Keypair({ publicKey, privateKey, keyType: KEY_TYPE });
};
