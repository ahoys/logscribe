import { getGlobalOptions, setGlobalOptions, testUtil } from '../index';

test('You can set globalOptions', () => {
  setGlobalOptions({ maxMsgLength: 700 });
  expect(getGlobalOptions().maxMsgLength).toBe(700);
});

test('Setting global options returns the updated globalOptions', () => {
  const globalOptions = setGlobalOptions({ maxMsgLength: 300 });
  expect(globalOptions.maxMsgLength).toBe(300);
});
