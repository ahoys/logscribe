import { getGlobalLogOptions, testUtil } from '../index';

test('Returns an object.', () => {
  expect(typeof getGlobalLogOptions()).toBe('object');
});

test('Returns proper options.', () => {
  expect(getGlobalLogOptions()).toEqual(testUtil().globalLogOptions);
});

test(`You can't mutate globalLogOptions.`, () => {
  const base = getGlobalLogOptions();
  base.maxMsgLength = 200;
  expect(getGlobalLogOptions().maxMsgLength).not.toBe(200);
  expect(base.maxMsgLength).toBe(200);
});
