import { getGlobalLogOptions, setGlobalLogOptions } from '../index';

test('You can set globalLogOptions', () => {
  setGlobalLogOptions({ maxMsgLength: 700 });
  expect(getGlobalLogOptions().maxMsgLength).toBe(700);
});

test('Setting global log options returns the updated globalLogOptions', () => {
  const globalLogOptions = setGlobalLogOptions({ maxMsgLength: 300 });
  expect(globalLogOptions.maxMsgLength).toBe(300);
});
