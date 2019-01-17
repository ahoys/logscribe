const log = require('../index');

// Application.log required in __tests__ dir.
const fullPath =
  `${log.getConfig().path}/` +
  `${log.getConfig().filename}.${log.getConfig().ext}`;

test('Trim file returns true on success.', () => {
  expect(log.trimFile(fullPath, 1000)).toBe(true);
});

test('Trim file returns false on wrong parameters.', () => {
  expect(log.trimFile()).toBe(false);
});
