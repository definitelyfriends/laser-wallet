import { fetchItem } from 'lib/store'

export const useStored = async () => {
  const address = await fetchItem('address')

  return !!address;
}
