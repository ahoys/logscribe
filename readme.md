# LogScribe

![alt text](https://github.com/ahoys/logscribe/blob/master/assets/logscribe_192.png "Logscribe")

How can a log be a scribe, you might wonder.

Well, by being super fast, simplistic and yet lightweight! That's how and here it is.

### What it does?
LogScribe is a yet another log-to-file utility library. It allows you to asynchonously write log and at the same time print console messages with a one, very short, command. LogScribe automatically splits the log files as they get too large.

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
- Warning colors.
- Timestamps and tags.
- Everything relevant can be configured.
- Log-specific options.

### Specs
- Bundle only 4KB.
- log: 0.849ms
- logSync: 3.126ms
- print: 0.489ms
- getGlobalOptions: 0.021ms
- setGlobalOptions: 0.142ms

## Install

Not yet released.
