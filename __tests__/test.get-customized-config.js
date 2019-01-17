const log = require('../index');

const customConfig = {
  filename: 'test',
  path: 'c:/',
  ext: 'txt',
  timestamps: false,
  maxSize: 4,
  maxStrLength: 7,
  disabledTags: [],
};

test('Return customized config.', () => {
  expect(log.getCustomizedConfig(customConfig)).toEqual(customConfig);
});

test('Return default config on failure.', () => {
  expect(log.getCustomizedConfig('fail')).toEqual(log.getConfig());
});
