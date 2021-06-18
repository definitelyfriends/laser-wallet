import { useQuery } from 'react-query';
import { fetchItem } from 'lib/store';

const HOTSPOTS = 'hotspots';
const OUIS = 'ouis';
const ACTIVITY = 'activity';
const ACTIVITY_COUNT = 'activity/count';
const ELECTIONS = 'elections';
const CHALLENGES = 'challenges';
const PENDING_TXNS = 'pending_transactions';
const REWARDS = 'rewards';
const REWARD_TOTALS = 'rewards/sum';
const STATS = 'stats';

const baseUrl = 'https://api.helium.io/v1';
const accounts = `${baseUrl}/accounts`;

// enum EndpointType {
//   HOTSPOTS = 'HOTSPOTS',
//   OUIS = 'OUIS',
//   ACTIVITY = 'ACTIVITY',
//   ACTIVITY_COUNT = 'ACTIVITY_COUNT',
//   ELECTIONS = 'ELECTIONS',
//   CHALLENGES = 'CHALLENGES',
//   PENDING_TXNS = 'PENDING_TXNS',
//   REWARDS = 'REWARDS',
//   REWARD_TOTALS = 'REWARD_TOTALS',
//   STATS = 'STATS',
// }

export const fetchAccountBase = async (type = '') => {
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
  return useQuery('accountHotspots', () => fetchAccountBase(HOTSPOTS));
};

export const fetchAccountOuis = () => {
  return useQuery('accountOUIs', () => fetchAccountBase(OUIS));
};

export const fetchAccountActivity = () => {
  return useQuery('accountActivity', () => fetchAccountBase(ACTIVITY));
};

export const fetchAccountActivityCount = () => {
  return useQuery('accountActivityCount', () => fetchAccountBase(ACTIVITY_COUNT));
};

export const fetchAccountElections = () => {
  return useQuery('accountElections', () => fetchAccountBase(ELECTIONS));
};

export const fetchAccountChallenges = () => {
  return useQuery('accountChallenges', () => fetchAccountBase(CHALLENGES));
};

export const fetchAccountPendingTxns = () => {
  return useQuery('accountPendingTxns', () => fetchAccountBase(PENDING_TXNS));
};

export const fetchAccountRewards = () => {
  return useQuery('accountRewards', () => fetchAccountBase(REWARDS));
};

export const fetchAccountRewardTotals = () => {
  return useQuery('accountRewardTotals', () => fetchAccountBase(REWARD_TOTALS));
};

export const fetchAccountStats = () => {
  return useQuery('accountStats', () => fetchAccountBase(STATS));
};
