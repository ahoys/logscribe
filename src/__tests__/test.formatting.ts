import { getTagForLog, getTagForPrint } from '../index';

test('getTagForLog returns a tag.', () => {
  expect(getTagForLog('tag')).toBe('[tag]');
});

test('getTagForPrint returns a default colored tag.', () => {
  expect(getTagForPrint('tag')).toBe('\x1b[36mtag\x1b[0m -');
});

test('Correct getTagForLog default return for invalid tag.', () => {
  expect(getTagForLog()).toBe('[]');
});

test('Correct getTagForPrint default return for invalid tag.', () => {
  expect(getTagForPrint('')).toEqual('\x1b[36m\x1b[0m -');
});

test('getTagForPrint supports custom colors.', () => {
  expect(getTagForPrint('tag', '\x1b[32m')).toBe('\x1b[32mtag\x1b[0m -');
});
