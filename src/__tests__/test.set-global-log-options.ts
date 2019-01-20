import { getGlobalLogOptions, setGlobalLogOptions, testUtil } from '../index';

test('You can set globalLogOptions', () => {
  setGlobalLogOptions({ maxMsgLength: 700 });
  expect(getGlobalLogOptions().maxMsgLength).toBe(700);
});

test('Setting global options returns the updated globalLogOptions', () => {
  const globalLogOptions = setGlobalLogOptions({ maxMsgLength: 300 });
  expect(globalLogOptions.maxMsgLength).toBe(300);
});
