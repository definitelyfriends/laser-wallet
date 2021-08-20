import { fetchItem } from 'lib/store';
import { isEmpty } from 'ramda';

export const useStored = async () => {
  const address = await fetchItem('address');

  return !isEmpty(address);
};
