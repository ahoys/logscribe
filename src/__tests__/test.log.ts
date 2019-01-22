import { log, logscribe } from '../index';

test('A proper log() returns a string.', () => {
  expect.assertions(1);
  return log('hello')
    .then((r) => {
      expect(typeof r).toBe('string');
    });
});

test('Invalid log() returns a string.', () => {
  expect.assertions(1);
  return log()
    .then((r) => {
      expect(typeof r).toBe('string');
    });
});

test('log() returns a formatted message.', () => {
  expect.assertions(1);
  const d = new Date();
  return log('hello')
    .then((r) => {
      expect(r).toBe(
        `${d}\n` +
        'hello\n\n'
      );
    });
});

test('log() returns a formatted message.', () => {
  expect.assertions(1);
  const ls = logscribe('tag');
  const d = new Date();
  return ls.log('hello')
    .then((r) => {
      expect(r).toBe(
        `${d}\n` +
        '[tag]\n' +
        'hello\n\n'
      );
    });
});
