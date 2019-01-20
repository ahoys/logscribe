import { getGlobalOptions, testUtil } from '../index';

test('Returns an object.', () => {
  expect(typeof getGlobalOptions()).toBe('object');
});

test('Returns proper options.', () => {
  expect(getGlobalOptions()).toEqual(testUtil().globalOptions);
});

test(`You can't mutate globalOptions.`, () => {
  const base = getGlobalOptions();
  base.maxMsgLength = 256;
  expect(getGlobalOptions().maxMsgLength).not.toBe(256);
  expect(base.maxMsgLength).toBe(256);
});
