import { useEffect, useState } from 'react';
import { fetchItem } from 'lib/store';

export const useVaultLookup = () => {
  const [vaults, setVaults] = useState<any[]>([]);

  useEffect(() => {
    fetchItem('vaults').then(list => setVaults(list));
  }, [vaults]);

  return vaults;
};
