import { getGlobalOptions, testUtil } from '../index';

test('Returns an object.', () => {
  expect(typeof getGlobalOptions()).toBe('object');
});

test('Returns proper options.', () => {
  expect(getGlobalOptions()).toEqual(testUtil().globalOptions);
});
