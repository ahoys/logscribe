const log = require('../index').log;

const cc = {
  timestamps: false,
};

test('Properly logs a line and returns the line.', () => {
  const str = `test-${new Date().getTime()}`;
  expect(log(str, '', cc)).toBe(str);
});
