import { useQuery } from 'react-query';

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

export const fetchAccountBase = async (address: string, type = '') => {
  const accountUrl = `${accounts}/${address}/${type}`;
  const response = await fetch(accountUrl);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const fetchAccount = (address: string) => {
  return useQuery('account', () => fetchAccountBase(address));
};

export const fetchAccountHotspots = (address: string) => {
  return useQuery('accountHotspots', () => fetchAccountBase(address, HOTSPOTS));
};

export const fetchAccountOuis = (address: string) => {
  return useQuery('accountOUIs', () => fetchAccountBase(address, OUIS));
};

export const fetchAccountActivity = (address: string) => {
  return useQuery('accountActivity', () => fetchAccountBase(address, ACTIVITY));
};

export const fetchAccountActivityCount = (address: string) => {
  return useQuery('accountActivityCount', () => fetchAccountBase(address, ACTIVITY_COUNT));
};

export const fetchAccountElections = (address: string) => {
  return useQuery('accountElections', () => fetchAccountBase(address, ELECTIONS));
};

export const fetchAccountChallenges = (address: string) => {
  return useQuery('accountChallenges', () => fetchAccountBase(address, CHALLENGES));
};

export const fetchAccountPendingTxns = (address: string) => {
  return useQuery('accountPendingTxns', () => fetchAccountBase(address, PENDING_TXNS));
};

export const fetchAccountRewards = (address: string) => {
  return useQuery('accountRewards', () => fetchAccountBase(address, REWARDS));
};

export const fetchAccountRewardTotals = (address: string) => {
  return useQuery('accountRewardTotals', () => fetchAccountBase(address, REWARD_TOTALS));
};

export const fetchAccountStats = (address: string) => {
  return useQuery('accountStats', () => fetchAccountBase(address, STATS));
};
