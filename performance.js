const f = require('./dist/index');

// Note that results vary depending on whether the
// application.log file already exists.

/**
 * Logs:
 * y2019/m01/d19
 * fn_log: 0.936ms
 * fn_logSync: 3.126ms
 * fn_print: 0.587ms
 * fn_getGlobalLogOptions: 0.055ms
 * fn_setGlobalLogOptions: 0.134ms
 */

console.log('\n');

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

// getGlobalLogOptions
console.time('fnc_getGlobalLogOptions');
f.getGlobalLogOptions();
console.timeEnd('fnc_getGlobalLogOptions');

// setGlobalLogOptions
console.time('fnc_setGlobalLogOptions');
f.setGlobalLogOptions({
  dirPath: './',
  disabledTags: ['d-tag'],
  filePrefix: 'custom',
  maxMsgLength: 1024,
  printConsole: false,
});
console.timeEnd('fnc_setGlobalLogOptions');
