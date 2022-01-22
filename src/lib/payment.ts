import { Address, Keypair } from '@helium/crypto';
import { PaymentV1, Transaction } from '@helium/transactions';
import { Client } from '@helium/http';
// import { Balance, CurrencyType } from '@helium/currency';
import { fetchItem } from 'src/lib/store';
import { decryptKey } from './vault';
import { toBuffer } from './vault.utils';
import * as buffer from 'buffer';

window.Buffer = buffer.Buffer;

export const initializePayment = async (payee: string, amount: number) => {
  const client = new Client();

  // the transactions library needs to be configured
  // with the latest chain vars in order to calcluate fees
  const vars = await client.vars.get();
  Transaction.config(vars);

  const fromAddress = await fetchItem('address');
  const vaults = await fetchItem('vaults');
  const { privateKey, publicKey } = vaults.find(
    (item: StoredVault) => item['address'] === fromAddress
  );

  if (publicKey == null || privateKey == null) {
    // TODO: bubble up an error message for the user.
    // we can't process a txn without the user signing it
    return;
  }

  const decryptedPublicKey = await decryptKey(publicKey);
  const unbufferedPubKey = await toBuffer(decryptedPublicKey);

  const decryptedPrivateKey = await decryptKey(privateKey);
  const unbufferedPrivateKey = await toBuffer(decryptedPrivateKey);

  const from = new Keypair({
    publicKey: unbufferedPubKey,
    privateKey: unbufferedPrivateKey,
    keyType: 'ed25519',
  });

  const to = Address.fromB58(payee);

  console.log('from: ', from.address.b58);

  // get the speculative nonce for the keypair
  const account = await client.accounts.get(from.address.b58);

  console.log(account);

  // construct a PaymentV2 txn for the purpose
  // of calculating the fee
  const paymentTxn = new PaymentV1({
    payer: from.address,
    payee: to,
    amount,
    nonce: Number(account?.speculativeNonce) + 1,
  });

  console.log(paymentTxn);

  // sign the payment txn with payers keypair
  const signedPaymentTxn = await paymentTxn.sign({ payer: from });

  console.log(signedPaymentTxn);

  // submit the serialized txn to the Blockchain HTTP API
  client.transactions.submit(signedPaymentTxn.toString());
};

// calculate max sendable amount
// const feeInDC = new Balance(paymentTxnForFee.fee, CurrencyType.dataCredit);
// const oracle = await client.oracle.getCurrentPrice();
// const feeInHNT = feeInDC.toNetworkTokens(oracle.price);
// const amountToSend = account.balance.minus(feeInHNT).integerBalance;
