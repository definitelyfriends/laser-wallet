import { fetchItem } from 'lib/store';

export const useAddress = async (): Promise<string | null> => await fetchItem('address');
