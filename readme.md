# <a href='https://github.com/ahoys/logscribe'><img src='https://raw.githubusercontent.com/ahoys/logscribe/master/assets/logscribe_192.png' height='192' alt='LogScribe Logo' /></a>

### What and why?
LogScribe aims to be as straigtforward, fast and robust log-to-file/terminal utility as possible.

The log file is automatically split into smaller files and each message will automatically have a timestamp attached. For more advanced usage, you can add tags to your messages and even color them.

### Quick examples

`log('Hello World!');`

Logs "Hello World!" into a log file called application-2019_01_22.log:
```
Tue Jan 22 2019 20:16:43 GMT+0200 (Eastern European Standard Time)
Hello World!
```
`print('Hello World!');`

The application console prints out "Hello World!".
```
[12.20.04] - Hello World!
```
`logprint('Hello World!);`

Both features with a one command.

`l('Hello World!');` `p('Hello World!');` `lp('Hello World!');`

And here are aliases for the functions above if you feel like typing extra letters is slowing you down.

### Treats
- Fully asynchronous
- No other dependencies
- Written in TypeScript
- Automatic log file splitting
- Automatic timestamps on everything
- Message tags
- Custom log folders
- Custom log prefixes
- Tag colors

## Install

npm

`npm install logscribe`

Yarn

`yarn add logscribe`

## Basic Usage

### log(...value: any): void
Logs a message into a log file.
```
import { log } from 'logscribe';
log('Hello World');
log('Hello World', 'This will take a new line', '3rd line');
```
Even though log accepts anything, you should mainly use strings, numbers, lists and booleans as some other types may not render anything useful. For example objects end up being [Object object] due to how JavaScript is.

**Alias:** l()

### print(...value: any): void
Prints a message.
```
import { print } from 'logscribe';
print('Hello World');
print('Hello World', '2nd part');
```
Unlike in log(), with print() you can also print out objects.

You can disable printing with `setPrintDisabled(boolean)`. This may be useful in production environments.

**Alias:** p()

### logprint(...value: any): void
Combines log() and print().
```
import { logprint } from 'logscribe';
logprint('Hello World');
logprint('Hello World', 'This will take a new line', '3rd line');
```
**Alias:** lp()

## Advanced Usage

### Logging, printing and logprinting with tags
To execute basic functionality with a tag or a custom color you need to initialize the log(), print() or logprint() functions with a `logscribe(tag: string, color?: string)` wrapper. 

With this wrapper you can define what tag or color is being used. You can also create multiple wrappers for different needs.
```
import logscribe from 'logscribe';
const { log, print, logprint } = logscribe('myTag');
// The following examples will have a "myTag" attached.
log('Hello World!')
print('Hello World!);
logprint('Hello World!);
```
Here we add a tag and a custom color:
```
import logscribe from 'logscribe';
const { print } = logscribe('myTag', '\x1b[32m');
print('myTag now has a custom color.');
```
Let's dive deeper. Two printing commands, one for regular prints and one for error events:
```
import logscribe from 'logscribe';
const { print } = logscribe('General');
const warningPrint = logscribe('WARNING', '\x1b[31m').print;
try {
  print('All good.');
} catch(e) {
  warningPrint('Oh no, an error.', e);
}
```
The ES5 syntax is *slightly* different:
```
// Logging without tags.
const { log } = require('logscribe');
// Printing with tags.
const { print } = require('logscribe').default('General');
...
```
## Settings

These are the optional global settings for LogScribe. Set them as your project initializes.

### setLogDirPath(value: string): void
Sets a directory path for the log files. The application must have a writing permission to the path and the path must exist.

`Default: <app root>`

### setLogMaxSize(value: number): void
The maximum filesize of a log before a new log file is created. Value is in bytes (1000 = 1KB).

`Default: 1024000`

### setLogPrefix(value: string): void
A prefix for the filenames. For example a value "custom" would produce: "custom_2019-22-01.log".

`Default: "application"`

### setPrintDisabled(value: boolean): void
Disables console printing. Useful in production environments where you may not want to print out everything.

`Default: false`

# Colors
A cheatsheet for console colors.
```
FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
```
