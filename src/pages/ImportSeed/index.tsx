import React, { useState } from 'react';
import { Buffer } from 'buffer';
import Vault from 'src/lib/vault';
import { useBooleanCheckboxes } from 'src/hooks/useBooleanCheckbox';

declare global {
  interface Window {
    Buffer: any;
    bob: any;
    vvv: any;
    keypair: any;
    KP: any;
    localforage: any;
  }
}

window.Buffer = Buffer;

const ImportSeed: React.FC = () => {
  const { checked, setChecked } = useBooleanCheckboxes();
  const [seedPhrase, setSeedPhrase] = useState('');
  const [password, setPassword] = useState('');

  const doPassphrase = async () => {
    const newVault = Vault({ seedPhrase, password });
  };

  return (
    <div>
      <h1>Restore your Account with Seed Phrase</h1>
      <h3>Enter your secret phrase here to restore your vault.</h3>
      <div>
        <label>Wallet Seed</label>
        {checked ? (
          <textarea placeholder="Separate each word with a single space"></textarea>
        ) : (
          <input
            aria-invalid="false"
            placeholder="Paste seed phrase from clipboard"
            type="password"
            dir="auto"
            onChange={e => setSeedPhrase(e.target.value)}
          />
        )}
      </div>
      <label>Password</label>
      <input
        aria-invalid="false"
        placeholder="Paste seed phrase from clipboard"
        type="password"
        dir="auto"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={doPassphrase}>do phrase thing</button>
      <div>
        <input
          type="checkbox"
          id="vehicle1"
          name="seed-phrase"
          checked={checked}
          onChange={e => {
            setChecked(e.target.checked);
          }}
        />
        <label htmlFor="seed-phrase">Show seed phrase</label>
      </div>
    </div>
  );
};

export default ImportSeed;
