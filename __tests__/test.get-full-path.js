const log = require('../index');

// Application.log required in __tests__ dir.
const fullPath =
  `${log.getConfig().path}/` +
  `${log.getConfig().filename}.${log.getConfig().ext}`;

test('Returns a valid full path.', () => {
  const { path, filename, ext } = log.getConfig();
  expect(log.getFullPath(path, filename, ext)).toBe(fullPath);
});
