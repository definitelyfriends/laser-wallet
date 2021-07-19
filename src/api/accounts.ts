import { useQuery, useInfiniteQuery } from 'react-query';
import { fetchItem } from 'lib/store';

const baseUrl = 'https://api.helium.io/v1';
const accounts = `${baseUrl}/accounts`;

enum Endpoint {
  HOTSPOTS = 'hotspots',
  OUIS = 'ouis',
  ACTIVITY = 'activity',
  ACTIVITY_COUNT = 'activity/count',
  ELECTIONS = 'elections',
  CHALLENGES = 'challenges',
  PENDING_TXNS = 'pending_txns',
  REWARDS = 'rewards',
  REWARD_TOTALS = 'rewards/sum',
  STATS = 'stats',
  NONE = '',
}

/**
 * Note: Test address with tons of transactions
 * 13HPSdf8Ng8E2uKpLm8Ba3sQ6wdNimTcaKXYmMkHyTUUeUELPwJ
 */

export const fetchAccountBase = async (type?: Endpoint, cursor?: string) => {
  const address = await fetchItem('address');
  let accountUrl = `${accounts}/${address}/${type}`;

  if (cursor) {
    accountUrl = `${accountUrl}?cursor=${cursor}`;
  }

  const response = await fetch(accountUrl);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const useFetchAccount = () => {
  return useQuery('account', () => fetchAccountBase(Endpoint.NONE));
};

export const useFetchAccountHotspots = () => {
  return useQuery('accountHotspots', () => fetchAccountBase(Endpoint.HOTSPOTS));
};

export const useFetchAccountOuis = () => {
  return useQuery('accountOUIs', () => fetchAccountBase(Endpoint.OUIS));
};

export const useFetchAccountActivity = () => {
  return useInfiniteQuery(
    'accountActivity',
    ({ pageParam }) => fetchAccountBase(Endpoint.ACTIVITY, pageParam),
    {
      getNextPageParam: (lastPage, pages) => lastPage.cursor,
    }
  );
};

export const useFetchAccountActivityCount = () => {
  return useQuery('accountActivityCount', () => fetchAccountBase(Endpoint.ACTIVITY_COUNT));
};

export const useFetchAccountElections = () => {
  return useQuery('accountElections', () => fetchAccountBase(Endpoint.ELECTIONS));
};

export const useFetchAccountChallenges = () => {
  return useQuery('accountChallenges', () => fetchAccountBase(Endpoint.CHALLENGES));
};

export const useFetchAccountPendingTxns = () => {
  return useQuery('accountPendingTxns', () => fetchAccountBase(Endpoint.PENDING_TXNS));
};

export const useFetchAccountRewards = () => {
  return useQuery('accountRewards', () => fetchAccountBase(Endpoint.REWARDS));
};

export const useFetchAccountRewardTotals = () => {
  return useQuery('accountRewardTotals', () => fetchAccountBase(Endpoint.REWARD_TOTALS));
};

export const useFetchAccountStats = () => {
  return useQuery('accountStats', () => fetchAccountBase(Endpoint.STATS));
};
