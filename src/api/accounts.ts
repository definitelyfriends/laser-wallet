import { useQuery } from 'react-query';
import { fetchItem } from 'lib/store';

const baseUrl = 'https://api.helium.io/v1';
const accounts = `${baseUrl}/accounts`;

enum Endpoint {
  HOTSPOTS = 'hotspots',
  OUIS = 'OUIS',
  ACTIVITY = 'ACTIVITY',
  ACTIVITY_COUNT = 'ACTIVITY_COUNT',
  ELECTIONS = 'ELECTIONS',
  CHALLENGES = 'CHALLENGES',
  PENDING_TXNS = 'PENDING_TXNS',
  REWARDS = 'REWARDS',
  REWARD_TOTALS = 'REWARD_TOTALS',
  STATS = 'STATS',
}

export const fetchAccountBase = async (type?: Endpoint) => {
  const address = await fetchItem('address');
  const accountUrl = `${accounts}/${address}/${type}`;
  const response = await fetch(accountUrl);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const fetchAccount = () => {
  return useQuery('account', () => fetchAccountBase());
};

export const fetchAccountHotspots = () => {
  return useQuery('accountHotspots', () => fetchAccountBase(Endpoint.HOTSPOTS));
};

export const fetchAccountOuis = () => {
  return useQuery('accountOUIs', () => fetchAccountBase(Endpoint.OUIS));
};

export const fetchAccountActivity = () => {
  return useQuery('accountActivity', () => fetchAccountBase(Endpoint.ACTIVITY));
};

export const fetchAccountActivityCount = () => {
  return useQuery('accountActivityCount', () => fetchAccountBase(Endpoint.ACTIVITY_COUNT));
};

export const fetchAccountElections = () => {
  return useQuery('accountElections', () => fetchAccountBase(Endpoint.ELECTIONS));
};

export const fetchAccountChallenges = () => {
  return useQuery('accountChallenges', () => fetchAccountBase(Endpoint.CHALLENGES));
};

export const fetchAccountPendingTxns = () => {
  return useQuery('accountPendingTxns', () => fetchAccountBase(Endpoint.PENDING_TXNS));
};

export const fetchAccountRewards = () => {
  return useQuery('accountRewards', () => fetchAccountBase(Endpoint.REWARDS));
};

export const fetchAccountRewardTotals = () => {
  return useQuery('accountRewardTotals', () => fetchAccountBase(Endpoint.REWARD_TOTALS));
};

export const fetchAccountStats = () => {
  return useQuery('accountStats', () => fetchAccountBase(Endpoint.STATS));
};
