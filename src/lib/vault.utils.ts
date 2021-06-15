import { split, map } from 'ramda';

import * as buffer from 'buffer';
(window as any).Buffer = buffer.Buffer;

export const lowercase = (word: string) => word.toLowerCase();

export const convertToArray = (seedPhrase: string): string[] => {
  return map(lowercase, split(' ', seedPhrase));
};

export const toBase64 = (key: Uint8Array): string => Buffer.from(key).toString('base64');
