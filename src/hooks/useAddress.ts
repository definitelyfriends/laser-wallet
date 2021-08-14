import { fetchItem } from 'lib/store';

export const useAddress = async (): Promise<[]> => await fetchItem('address');
