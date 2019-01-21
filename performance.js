const { log, logprint, print } = require('./dist/index');

// Note that results vary depending on whether the
// application.log file already exists.

/**
 * v.1.0.3
 * fn_log: 0.936ms
 * fn_logSync: 3.126ms
 * fn_print: 0.524ms
 * fn_getGlobalLogOptions: 0.052ms
 * fn_setGlobalLogOptions: 0.134ms
 * 
 * v.1.1.0
 * log(): 0.251ms
 * logprint(): 1.320ms
 * print(): 0.317ms
 */

console.log('\n');

console.time('log');
log('Hello World!');
console.timeEnd('log');

console.time('logprint');
logprint('Hello World!');
console.timeEnd('logprint');

console.time('print');
print('Hello World!');
console.timeEnd('print');

// // log
// console.time('fnc_log');
// f.log('msg', 'log', false);
// console.timeEnd('fnc_log');

// // logSync
// console.time('fnc_logSync');
// f.logSync('msg', 'logSync', false);
// console.timeEnd('fnc_logSync');

// // print
// console.time('fnc_print');
// f.print('msg', 'print');
// console.timeEnd('fnc_print');

// // getGlobalLogOptions
// console.time('fnc_getGlobalLogOptions');
// f.getGlobalLogOptions();
// console.timeEnd('fnc_getGlobalLogOptions');

// // setGlobalLogOptions
// console.time('fnc_setGlobalLogOptions');
// f.setGlobalLogOptions({
//   dirPath: './',
//   disabledTags: ['d-tag'],
//   filePrefix: 'custom',
//   maxMsgLength: 1024,
//   printConsole: false,
// });
// console.timeEnd('fnc_setGlobalLogOptions');
