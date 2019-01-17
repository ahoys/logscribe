const filescribe = require('../index');

test('Disable multiple tags.', () => {
  filescribe.disable('testTag0');
  filescribe.disable('testTag1');
  filescribe.disable('*');
  const dt = filescribe.getConfig().disabledTags;
  expect(dt).toEqual(['testTag0', 'testTag1', '*']);
});

test('Fail to disable tags.', () => {
  filescribe.disable();
  const dt = filescribe.getConfig().disabledTags;
  expect(dt).toEqual(['testTag0', 'testTag1', '*']);
});
