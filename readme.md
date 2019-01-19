# LogScribe

![alt text](https://github.com/ahoys/logscribe/blob/master/assets/logscribe_192.png "Logscribe")

Yet another fast, simplistic and lightweight log-to-file utility!

### Features
- Log to file.
- Automatic log-file splitting.
- Optional console print outs.
- Timestamps and tags.
- Partial log disabling based on tags.

### Treats
- No third party dependencies.
- Exhaustively tested.
- Performance measured.
- Made with Typescript.

## Install

Not yet released.

## Usage
A typical example of Logscribe usage:
```
import log from 'logscribe';
log('Hello World');

OR

const log = require('logscribe);
log('Hello World');
```
Here we log `Hello World`. The message will automatically have a timestamp attached into it.

Another useful feature is tagging:
```
import log from 'logscribe';
log('Hello World', 'My Example Function', false);
```
This time the message will also have a `[My Example Function]` tag, which helps you to understand from where is the log coming from.

We also set console printting to false, which means the result can be seen from the log file only.

`log(message, tag, console print, options)`

**By default the application_*.log file appears into the root folder of the project.**

**Tip:** Adding !! in front of a message (e.g. `!!Memory failure.`) will color it red!

## Advanced

### Default global options
These options are used by default. You can change the options locally log-by-log or globally.
```
dirPath: 'your project root',
disabledTags: [],
filePrefix: 'application',
maxMsgLength: 8192,
printConsole: true,
```

#### dirPath: string
A custom directory path for the log file. E.g. `'c:/logs'`. The application must have a write access to the path.

#### disabledTags: Array\<string\>
Tags that won't log at the current moment.

#### filePrefix: string
A custom prefix for the log files. For example 'custom' would generate `custom_2019_01_19_12341234.log` -files.

#### maxMsgLength: number
After how many characters will the message be spliced?

#### printConsole: boolean
Whether to do console.log() print outs of the messages.

### Logscribe.setGlobalOptions
Sets new global options:
```
import { setGlobalOptions } from 'logscribe';
setGlobalOptions.({
  disabledTags: ['preventThisTag'],
  maxMsgLength: 10240,
  dirPath: './logs',
  printConsole: false,
});
```

**Tip:** Adding tags to disabledTags will disable all logs that have the tag.

### Logscribe.getGlobalOptions
Returns the current global options of Logscribe:
```
import { getGlobalOptions } from 'logscribe';
console.log(getGlobalOptions());
```

### Local logging options
As promised, you can also have custom options log by log. Maybe some logs need to go somewhere else? Maybe some logs can't be over 512 characters? No problem:
```
import log from 'logscribe';
log(
  'Hello World',
  '',
  false,
  {
    maxMsgLength: 512,
    dirPath: './specialLogs'
  }
);
```

**Tip:** Leaving the tag empty ('') means there won't be any tags attached.

## Performance
Here are the v.1.0.0 performance readings (i5-7600K):
- logscribe.log: **0.976ms**
- logscribe.getGlobalOptions: **0.015ms**
- logscribe.setGlobalOptions: **0.123ms**

Size of the bundle: **1.76KB**
