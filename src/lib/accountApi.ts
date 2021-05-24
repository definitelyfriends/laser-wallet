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

export const fetchAccount = async (address: string, type = '') => {
  const accountUrl = `${accounts}/${address}/${type}`;
  const response = await fetch(accountUrl);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const fetchAccountHotspots = (address: string) => {
  return useQuery('accountHotspots', () => fetchAccount(address, HOTSPOTS));
};

export const fetchAccountOuis = async (address: string) => {
  return useQuery('accountOUIs', () => fetchAccount(address, OUIS));
};

export const fetchAccountActivity = async (address: string) => {
  return useQuery('accountActivity', () => fetchAccount(address, ACTIVITY));
};

export const fetchAccountActivityCount = async (address: string) => {
  return useQuery('accountActivityCount', () => fetchAccount(address, ACTIVITY_COUNT));
};

export const fetchAccountElections = async (address: string) => {
  return useQuery('accountElections', () => fetchAccount(address, ELECTIONS));
};

export const fetchAccountChallenges = async (address: string) => {
  return useQuery('accountChallenges', () => fetchAccount(address, CHALLENGES));
};

export const fetchAccountPendingTxns = async (address: string) => {
  return useQuery('accountPendingTxns', () => fetchAccount(address, PENDING_TXNS));
};

export const fetchAccountRewards = async (address: string) => {
  return useQuery('accountRewards', () => fetchAccount(address, REWARDS));
};

export const fetchAccountRewardTotals = async (address: string) => {
  return useQuery('accountRewardTotals', () => fetchAccount(address, REWARD_TOTALS));
};

export const fetchAccountStats = async (address: string) => {
  return useQuery('accountStats', () => fetchAccount(address, STATS));
};
