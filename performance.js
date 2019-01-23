const { log, logprint, print } = require('./dist/index');

// Note that results may vary depending on whether the
// application.log file already exists.

/**
 * v.1.0.3
 * fn_log: 0.936ms
 * fn_logSync: 3.126ms
 * fn_print: 0.524ms
 * fn_getGlobalLogOptions: 0.052ms
 * fn_setGlobalLogOptions: 0.134ms
 * 
 * v.2.0.0
 * log(): 0.696ms
 * logprint(): 1.349ms
 * print(): 0.209ms
 */

console.log('\n');

// NOTE: running log and logprint at the same time will skew the results
// because of inner optimizations. The second log run is always faster.

// 1.873ms
console.time('log');
log('Hello World!');
console.timeEnd('log');

// 2.433ms
// console.time('logprint');
// logprint('Hello World!');
// console.timeEnd('logprint');

console.time('print');
print('Hello World!');
console.timeEnd('print');
