import { usersSortByScore } from '../../src/filters/usersFilter';

import { expect, test } from 'vitest';
const data = [{Score: 25}, {Score: 40}, {Score: 13}];
const sortedData = usersSortByScore(data);
const expectedData = [{Score: 40}, {Score: 25}, {Score: 13}];

test('Player 2 score > Player 1 score', () => {
  expect(sortedData[0]).toBe(expectedData[0]);
});

console.log(sortedData);