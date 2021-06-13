import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createVault } from 'lib/vault';
import { useBooleanCheckboxes } from 'hooks/useBooleanCheckbox';

const ImportSeed: React.FC = () => {
  const { checked, setChecked } = useBooleanCheckboxes();
  const [seedPhrase, setSeedPhrase] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const doPassphrase = async () => {
    const created = await createVault({ seedPhrase, password });

    if (created) {
      // route to home screen
      history.push('/home');
      // fetch HNT amount
      // show HNT amount in USD
      return;
    }
  };

  const goHome = () => history.push('/home');

  return (
    <div>
      <h1>Restore your Account with Seed Phrase</h1>
      <h3>Enter your secret phrase here to restore your vault.</h3>
      <button onClick={() => goHome()}>go home</button>
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
