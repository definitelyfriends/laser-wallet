const baseUrl = 'https://api.helium.io/v1';
const accounts = `${baseUrl}/accounts`;

const HOTSPOT = 'hotspot';
const OUIS = 'ouis';
const ACTIVITY = 'activity';
const ACTIVITY_COUNT = 'activity/count';
const ELECTIONS = 'elections';
const CHALLENGES = 'challenges';
const PENDING_TXNS = 'pending_transactions';
const REWARDS = 'rewards';
const REWARD_TOTALS = 'rewards/sum';
const STATS = 'stats';

const generateAddressUrl = (address: string, type = '') =>
  `${accounts}/${address}/${type}`;

export const fetchAccount = async (address: string) => {
  const accountUrl = generateAddressUrl(address);
  const response = await fetch(accountUrl);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const fetchAccountHotspots = async (address: string) => {
  const ouiUrl = generateAddressUrl(address, OUIS);
  const response = await fetch(ouiUrl);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
