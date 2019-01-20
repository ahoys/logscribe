# LogScribe

# <a href='https://github.com/ahoys/logscribe'><img src='https://raw.githubusercontent.com/ahoys/logscribe/master/assets/logscribe_192.png' height='192' alt='LogScribe Logo' /></a>

How can a log be a scribe, you might wonder.

Well, by being super fast, simplistic and yet lightweight! That's how and here it is.

### What it does?
LogScribe is a yet another log-to-file utility library. It allows you to asynchronously write log and at the same time print console messages with a one, very short, command. LogScribe automatically splits the log files as they get too large.

`log('Hello World');`
I just logged "Hello World" into a log file and printed it to my console.

`log('Hello World', 'Super Secret Function');`
And just like that I attached a tag to it.

`print('No need to log this!');`
Not everything has to be logged.

```
Sat Jan 19 2019 09:44:26 GMT+0200 (Eastern European Standard Time)
Hello World

[Super Secret Function]
Sat Jan 19 2019 09:44:27 GMT+0200 (Eastern European Standard Time)
Hello World
```
And this is how my `application_2019_01_19.log` now looks like.

### Treats
- No external libraries!
- Written in TypeScript.
- Asynchronous (can be used synchronously too).
- Automatic log file splitting.
- Custom log folders.
- Custom log prefixes.
- Console colors.
- Timestamps and tags.
- Log-specific options.

### Specs
- log(): 0.936ms
- logSync(): 3.126ms
- print(): 0.524ms
- getGlobalLogOptions(): 0.052ms
- setGlobalLogOptions(): 0.134ms

## Install

npm

`npm install logscribe`

Yarn

`yarn add logscribe`

## Usage

### log()
Logs a message into a log file.
```
import log from 'logscribe';
log('Hello World');
log('Hello World', 'Example Tag');
log('Hello World', 'Example Tag', false);
log('Hello World', 'Example Tag', false, { filePrefix: 'myFile' });
```
Parameters:
1. **@param message {any}** - A message to be logged.
2. **@param tag {string}** - A tag for the message **(optional)**.
3. **@param doPrint {boolean}** - Whether to console print out the message (console.log) **(optional)**.
4. **@param options {object}** - Various options for overriding global log options **(optional)**.

### logSync()
Basically exactly the same as the log(), but synchronous. If it is **crucial** to log the events in a correct order, use logSync(). When saving log asynchronously (log()), two almost simultaneously triggered logs may not finish in the same order as they started. LogSync() is about 3x slower than log(), though still fast.

### print()
Prints a message to a console.
```
import { print } from 'logscribe';
print('Hello World');
print('Hello World', 'Example Tag');
print('Hello World', 'Example Tag', { filePrefix: 'myFile' });
print('Hello World', 'Example Tag', { filePrefix: 'myFile' }, new Date());
```
Parameters:
1. **@param message {any}** - A message to be logged.
2. **@param tag {string}** - A tag for the message **(optional)**.
3. **@param options {object}** - Various options for overriding global log options **(optional)**.
4. **@param date {Date}** - If you want to display some different Date **(optional)**.

### getGlobalLogOptions()
Returns the currently active global log options.
```
import { getGlobalLogOptions } from 'logscribe';
getGlobalLogOptions();
```
1. **@returns {object}** - The current global settings.

### setDirPath(value: string)
Set path for the log files. The path must exist and the application must have writing permissions to the path. Note that this is a directory path, not a full filepath. See `setFilePrefix()` for more.

`Default: <project root>`

### setDisabledTags(value: string[])
Messages that have these tags won't be logged or printed. If `"*"` is added then nothing will be saved/displayed.

`Default: []`

### setFilePrefix(value: string)
Prefix for the log file. For example `"custom"` would mean `custom_2019_01_20.log` -files.

`Default: "application"`

### setMaxMsgLength(value: number)
Maxmimum length (chars) of a message. If a message is longer than this value, the message will be cut.

`Default: 8192`

### setPrintColor(value: string)
Tag and time coloring. This is useful to mark something more crucial by coloring it to something else. Note that this affects only the console, not logging.

`Default: "\x1b[32m" (green)`

### setPrintConsole(value: boolean)
Whether to print out what is logged. Note that disabling this won't disable print().

`Default: true`
