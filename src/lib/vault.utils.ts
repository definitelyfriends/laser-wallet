import { split, map } from 'ramda';

export const lowercase = (word: string) => word.toLowerCase();

export const convertToArray = (seedPhrase: string): string[] => {
  return map(lowercase, split(' ', seedPhrase));
};

export const toBase64 = (key: Uint8Array): string => Buffer.from(key).toString('base64');
