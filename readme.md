# <a href='https://github.com/ahoys/logscribe'><img src='https://raw.githubusercontent.com/ahoys/logscribe/master/assets/logscribe_192.png' height='192' alt='LogScribe Logo' /></a>

How can a log be a scribe, you might wonder?

Well, keep on reading and you'll realize that logs are natural loggers!

### What it does?
LogScribe aims to be as straigtforward, fast and robust log-to-file utility as possible. Log files are automatically splitted if they get too big and each log-message will automatically have a date attached to it. You can even add tags and colors to your messages. Check out the quick examples below!

`log('Hello World!');`

I just logged "Hello World!" into a log file called application-2019_01_22.log:
```
Tue Jan 22 2019 20:16:43 GMT+0200 (Eastern European Standard Time)
Hello World!
```
`print('Hello World!');`

Now I printed out "Hello World!" to a console:
```
[12.20.04] - Hello World!
```
`logprint('Hello World!);`

And now I did both at the same time!

`l('Hello World!');` `p('Hello World!');` `lp('Hello World!');`

And here are aliases for the functions above if you feel like typing extra letters is slowing you down.

### Treats
- No other dependencies!
- Written in TypeScript
- Automatic log file splitting
- Custom log folders
- Custom log prefixes
- Automatic timestamps
- Tags
- Tag colors

### Specs
- log(): 0.696ms
- print(): 0.209ms
- logprint(): 1.349ms

## Install

npm

`npm install logscribe`

Yarn

`yarn add logscribe`

## Basic Usage

### log(any)
Logs messages into a log file.
```
import { log } from 'logscribe';
log('Hello World');
log('Hello World', 'This will take a new line', '3rd line');
```
Even though log accepts anything, you should mainly use strings, numbers, lists and booleans as some other types may not be very useful when logged. For example objects end up being [Object object].

**Alias:** l()

### print(any)
Prints messages to a console.
```
import { print } from 'logscribe';
print('Hello World');
print('Hello World', 'This will take a new line', '3rd line');
```
Unlike in log(), with print() you can also print out objects. You can disable printing with `setPrintDisabled(boolean)`.

**Alias:** p()

### logprint(any)
Combines log() and print().
```
import { logprint } from 'logscribe';
logprint('Hello World');
logprint('Hello World', 'This will take a new line', '3rd line');
```
**Alias:** lp()

## Advanced Usage

### Logging, printing and logprinting with tags
To execute basic functionality with a tag or a custom color you need to initialize the log(), print() or logprint() functions with a `logscribe(tag: string, color?: string)` wrapper. With this wrapper you can define what tags or colors are being used. You can also create multiple wrappers for different needs!
```
import logscribe from 'logscribe';
const ls = logscribe('myTag');
// We now have a wrapper function "ls" that includes the basic functionality with tags enabled!
// The following examples will have a "myTag" attached.
ls.log('Hello World!')
ls.print('Hello World!);
ls.logprint('Hello World!);
```
You can also minify the above:
```
import logscribe from 'logscribe';
const lp = logscribe('myTag').lp;
lp('And here we go!');
```
Here we add a tag and a custom color!
```
import logscribe from 'logscribe';
const p = logscribe('myTag', '\x1b[32m').lp;
p('myTag now has a cool custom color.');
```
Let's dive deeper...
```
import logscribe from 'logscribe';
const print = logscribe('General').p;
const warningPrint = logscribe('WARNING', '\x1b[31m').p; // "\x1b[31m" is red.
try {
  print('Everything is cool!');
} catch(e) {
  warningPrint('Oh no, an error!', e);
}
```
## Settings

These are global settings for LogScribe. Set them as your project initializes.

### setLogDirPath(string)
Sets a directory path for the log files. The application must have a writing permission to the path and the path must exist.

`Default: <app root>`

### setLogMaxSize(number)
Maximum filesize of a log before a new log file is created. Value is in bytes (1000 = 1KB).

`Default: 1024000`

### setLogPrefix(string)
Prefix for the log file. For example a value "custom" would end up being: `custom_2019-22-01.log`.

`Default: "application"`

### setPrintDisabled(boolean)
Whether to disable p(), print() and partially logprint() or lp(). Logging will stay active. Useful in situations where you'd like to disable printing, like for example in production environments: `setPrintDisabled(process.env.NODE_ENV === 'production');`.

`Default: false`

# Colors
Here's a cheatsheet for suitable console colors.
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
