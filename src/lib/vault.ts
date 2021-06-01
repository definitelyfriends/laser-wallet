import { Keypair } from '@helium/crypto';
import { split, map } from 'ramda';
import {storeItem} from 'src/lib/store'

interface Vault {
  password: string
  phrase: string
}

const Vault = () => {
  const _lowercase = (word: string) => word.toLowerCase();

  function _convertToArray(seedPhrase: string): string[] {
    return map(_lowercase, split(' ', seedPhrase));
  }

  async function create({ password, phrase }: Vault) {
    const keypair = await Keypair.fromWords(_convertToArray(phrase));

    await storeItem('password', password);
    await storeItem('publicKey', keypair.publicKey);
    await storeItem('privateKey', keypair.privateKey);
  }

  function encrypt() {

  }

  function decrypt(password: string) {

  }

  return {
    create,
    encrypt,
    decrypt
  }
}

export default Vault;
