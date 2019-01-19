const f = require('./dist/index');

// Note that results vary depending on whether the
// application.log file already exists.

/**
 * Logs:
 * y2019/m01/d19
 * fn_log: 0.976ms
 * fn_getGlobalOptions: 0.015ms
 * fn_setGlobalOptions: 0.123ms
 */

// log
console.time('fnc_log');
f.log('msg', 'tag');
console.timeEnd('fnc_log');

// getGlobalOptions
console.time('fnc_getGlobalOptions');
f.getGlobalOptions();
console.timeEnd('fnc_getGlobalOptions');

// setGlobalOptions
console.time('fnc_setGlobalOptions');
f.setGlobalOptions({
  disabledTags: [],
  maxMsgLength: 1024,
  path: '',
});
console.timeEnd('fnc_setGlobalOptions');
