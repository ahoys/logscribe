const { log, logprint, print } = require('./dist/index');

// Rules: application_*.log must exist, so run log at least once before
// measuring. Most of the time in real-world the application's log is
// already created.
// Run one test at a time. Multiple runs at a time cause strange interference
// that decreases the execution time.

// v.2.0.0: 1.675ms
// console.time('log');
// log('Hello World!');
// console.timeEnd('log');

// v.2.0.0: 4.892ms
// console.time('logprint');
// logprint('Hello World!');
// console.timeEnd('logprint');

// v.2.0.0: 3.609ms
// console.time('print');
// print('Hello World!');
// console.timeEnd('print');
