import { getGlobalOptions, testUtil } from '../index';

test('Returns an object.', () => {
  expect(typeof getGlobalOptions()).toBe('object');
});

test('Returns proper options.', () => {
  expect(getGlobalOptions()).toEqual(testUtil().globalOptions);
});

test(`You can't mutate globalOptions.`, () => {
  const base = getGlobalOptions();
  base.maxMsgLength = 200;
  expect(getGlobalOptions().maxMsgLength).not.toBe(200);
  expect(base.maxMsgLength).toBe(200);
});
