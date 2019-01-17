# FileScribe

![alt text](https://github.com/ahoys/filescribe/blob/master/src/assets/filescribe.png "Filescribe")

Yet another log-file utility! Provides a really simplistic way to log into a log-file with no extra dependencies.

## Install

`npm i filescribe`

or

`yarn add filescribe`

## Usage

```
const log = require('filescribe').log;
log('Hello World!);
```
And that's all folks. A file `application.log` appears into your project's root folder.

See below for advanced.

## Syntax
`log(message: string, tag: string, options: object);`

1. The message you want to log.
2. Tag for the message, if any.
3. Custom options, if any.

## Examples
If you want to attach a tag:

`log('Hello World!', 'myTag');`

If you want to override some default setting:

```
log(
  'Hello World!',
  '', // This means there won't be a tag.
  {
    filename: 'myFile',
    ext: 'txt'
  }
)
```

If you want to override some default setting for good, use "set":

```
filescribe.set({
  filename: 'myFile',
  ext: 'txt',
  maxSize: 1000,
});
```

## Default Settings

Use filescribe.set() to override any of these settings. You can also override with the subscribe.log(), just use the keys below.

Unknown settings won't be saved. Also, if the setting is of wrong type it won't be saved.

```
filename: 'application', // Filename for the log.
path: './', // Application's root.
ext: 'log', // Extension of the log.
timestamps: true, // Whether to show timestamps.
maxSize: 1000000, // Maximum size of the file. 1000 = 1KB.
maxStrLength: 1024, // Maximum length of a one log('').
disabledTags: [], // Disabled tags, e.g. ['myTag'].
```

## Other tricks

### filescribe.disable(tag: string);
Disables filescribe (won't log) for the given tag. For example `filescribe.disable('myTag');` would disable all myTag logs. If you want to disable all logging, use: `filescribe.disable('*');`.

### filescribe.enable(tag: string);
This way you can enable what you've disabled. To enable all: `filescribe.enable('*')`.

### filescribe.getConfig();
Returns the current global config object with all the options.
