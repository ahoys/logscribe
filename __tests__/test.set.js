const log = require('../index');

const valid = {
  filename: 'stuff',
  path: 'testDir',
  ext: 'ini',
  timestamps: false,
  maxSize: 1000,
  maxStrLength: 1000,
  disabledTags: [],
};

const invalid = {
  filename: false,
  path: false,
  ext: false,
  timestamps: 'false',
  maxSize: false,
  maxStrLength: false,
  disabledTags: [],
};

test('Replaces defaults with custom keys.', () => {
  expect(log.set(valid)).toEqual(valid);
});

test('Does not replace with invalid values.', () => {
  expect(log.set(invalid)).not.toEqual(invalid);
});
