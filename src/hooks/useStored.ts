import { fetchItem } from 'lib/store'

export const useStored = () => {
  const address = fetchItem('address')

  return !!address;
}
