import { getGlobalOptions, setGlobalOptions, testUtil } from '../index';

const base = getGlobalOptions();

// test(`You can't mutate globalOptions.`, () => {
//   const base = getGlobalOptions();
//   base.maxMsgLength = 256;
//   expect(getGlobalOptions().maxMsgLength).not.toBe(256);
// });
