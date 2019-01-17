const filescribe = require('../index');

filescribe.set({
  disabledTags: ['testTag0', 'testTag1', 'testTag2'],
});

test('Enable multiple tags.', () => {
  filescribe.enable('testTag0');
  filescribe.enable('testTag1');
  const dt = filescribe.getConfig().disabledTags;
  expect(dt).toEqual(['testTag2']);
});

test('Enable all tags.', () => {
  filescribe.enable('*');
  const dt = filescribe.getConfig().disabledTags;
  expect(dt).toEqual([]);
});
