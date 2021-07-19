import {
  uniqueNamesGenerator,
  adjectives,
  starWars,
  colors,
  animals,
} from 'unique-names-generator';

export const nameGenerator = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors, starWars],
    length: 3,
    separator: ' ',
    style: 'capital',
  });
