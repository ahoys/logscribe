const f = require('./dist/index');

// Note that results vary depending on whether the
// application.log file already exists.

/**
 * Logs:
 * y2019/m01/d19
 * fn_log: 0.849ms
 * fn_logSync: 3.126ms
 * fn_print: 0.489ms
 * fn_getGlobalOptions: 0.021ms
 * fn_setGlobalOptions: 0.142ms
 */

// log
console.time('fnc_log');
f.log('msg', 'log', false);
console.timeEnd('fnc_log');

// logSync
console.time('fnc_logSync');
f.logSync('msg', 'logSync', false);
console.timeEnd('fnc_logSync');

// print
console.time('fnc_print');
f.print('msg', 'print');
console.timeEnd('fnc_print');

// getGlobalOptions
console.time('fnc_getGlobalOptions');
f.getGlobalOptions();
console.timeEnd('fnc_getGlobalOptions');

// setGlobalOptions
console.time('fnc_setGlobalOptions');
f.setGlobalOptions({
  dirPath: './',
  disabledTags: ['d-tag'],
  filePrefix: 'custom',
  maxMsgLength: 1024,
  printConsole: false,
});
console.timeEnd('fnc_setGlobalOptions');
