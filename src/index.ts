import * as fs from 'fs';
import * as path from 'path';

// Testing environment doesn't understand require.main and such.
const isTesting = process.env.NODE_ENV === 'testing';
if (!isTesting) {
  require.main = process.mainModule;
}

// AppDir holds directory path to the application's root.
const appDir = isTesting
  ? path.resolve(__dirname)
  : path.dirname(require && require.main ? require.main.filename : '');

// Here we will store ids of async Promises so that the logging will happen in order.
// Prioritize the user's application 1st!
let buffer: string[] = [];
let dateBuffer: Date[] = [];

// Interfaces -----------------------------------------------------------------
export interface IlogScribe {
  l: (...payload: any) => void;
  log: (...payload: any) => void;
  logprint: (...payload: any) => void;
  lp: (...payload: any) => void;
  p: (...payload: any) => void;
  print: (...payload: any) => void;
}

export interface Isettings {
  logDirPath: string;
  logMaxSize: number;
  logPrefix: string;
  printDisabled: boolean;
  printTagColor: string;
}

// Settings -------------------------------------------------------------------

// These are the so called global settings.
// User can modify these on file-basis.
const settings: Isettings = {
  logDirPath: appDir,
  logMaxSize: 1024000,
  logPrefix: 'application',
  printDisabled: false,
  printTagColor: '\x1b[36m',
};

// Used to search for existing log files.
let regExp = new RegExp(`^${settings.logPrefix}_.*log`, 'g');

// LogScribe utility methods --------------------------------------------------

/**
 * Returns a tag that is suitable for printting.
 * @param {string} tag - A tag to be printed.
 * @param {color} color - Color of the tag text.
 * @returns {string} - A formatted tag.
 */
export const getTagForPrint = (tag: string, color?: string): string => {
  try {
    return `${color || settings.printTagColor}${tag}\x1b[0m -`;
  } catch {
    return ' -';
  }
};

/**
 * Returns a tag that is suitable for logging.
 * @param {string} tag - A tag to be logged.
 * @returns {string} - A formatted tag.
 */
export const getTagForLog = (tag?: string): string => {
  try {
    return typeof tag === 'string' && tag !== '' ? `[${tag}]` : '[]';
  } catch {
    return '[]';
  }
};

const writeBufferToLog = (
  files: string[],
  index: number,
  existingPath?: string
): void => {
  try {
    // We can't combine finding with executeBuffer() at it may be that the
    // previous entry in buffer was humongous and the size is now fulfilled.
    let filepath = '';
    if (existingPath) {
      // We already have a suitable filepath.
      filepath = existingPath;
    } else if (index === 0) {
      // This is the first run, we are required to search for
      // existing log files.
      const existingLog = files.find(
        f =>
          fs.statSync(`${settings.logDirPath}\\${f}`).size < settings.logMaxSize
      );
      filepath = existingLog
        ? `${settings.logDirPath}\\${existingLog}`
        : `${settings.logDirPath}\\${settings.logPrefix}_` +
          `${dateBuffer[index].getFullYear()}-` +
          `${dateBuffer[index].getMonth()}-` +
          `${dateBuffer[index].getDate()}-` +
          `${dateBuffer[index].getTime()}.log`;
    } else {
      filepath =
        `${settings.logDirPath}\\${settings.logPrefix}_` +
        `${dateBuffer[index].getFullYear()}-` +
        `${dateBuffer[index].getMonth()}-` +
        `${dateBuffer[index].getDate()}-` +
        `${dateBuffer[index].getTime()}.log`;
    }
    fs.appendFile(filepath, buffer[index], 'utf8', aErr => {
      if (aErr) {
        // Something went wrong, clear the buffer to start fresh
        // next time.
        buffer = [];
        dateBuffer = [];
      } else if (buffer[index + 1]) {
        // We measure the file size after the addition
        // to determine whether this same file can be re-used
        // for the next buffer entry. This should save us some cycles.
        fs.stat(filepath, (err, stat) => {
          if (err) {
            buffer = [];
            dateBuffer = [];
          } else if (stat.size < settings.logMaxSize) {
            // We skip executeBuffer to save performance.
            // In theory some of the files may have gotten deleted,
            // but that should be super rare as the buffer clears so fast and
            // no-one else should be removing our log files after all.
            writeBufferToLog(files, index + 1, filepath);
          } else {
            writeBufferToLog(files, index + 1);
          }
        });
      } else {
        // Buffer is executed, clear it.
        buffer = [];
        dateBuffer = [];
      }
    });
    return;
  } catch {
    return;
  }
};

const executeBuffer = (index: number): void => {
  fs.readdir(settings.logDirPath, (err, items) => {
    if (err) {
      // Something went wrong, clear the buffer to start fresh
      // next time.
      buffer = [];
      dateBuffer = [];
    } else {
      // Write log based on the buffer.
      writeBufferToLog(items.filter(f => f.match(regExp)), index);
    }
  });
};

// LogScribe public methods ---------------------------------------------------

/**
 * Logs text to a log file.
 * @param payload - A message to log.
 * @returns {Promise<string>} - A message that was saved.
 */
export const log = (...payload: any): void => {
  try {
    let m = '';
    // Combine the message. Remember, join() would be heavy.
    payload.forEach((v: any) => (m += `${v}\n`));
    if (!buffer[0]) {
      dateBuffer.push(new Date());
      buffer.push(`${dateBuffer[0]}\n${m}\n`);
      executeBuffer(0);
    } else {
      const d = new Date();
      dateBuffer.push(d);
      buffer.push(`${d}\n${m}\n`);
    }
  } catch {
    return;
  }
};

// Alias to log().
export const l = log;

/**
 * Prints text to console.
 * @param payload - A message to print.
 */
export const print = (...payload: any): void => {
  try {
    if (settings.printDisabled) {
      // If printing is disabled, don't print.
      return;
    }
    const d = new Date();
    console.log(
      `${('0' + d.getHours()).slice(-2)}:` +
        `${('0' + d.getMinutes()).slice(-2)}:` +
        `${('0' + d.getSeconds()).slice(-2)}`,
      ...payload
    );
  } catch {
    return;
  }
};

// Alias to print().
export const p = print;

/**
 * Logs and prints a message.
 * A combination of log() and print().
 * @param payload - A message to print and log.
 */
export const logprint = (...payload: any): void => {
  try {
    print(...payload);
    log(...payload);
  } catch {
    return;
  }
};

// Alias to logprint();
export const lp = logprint;

// LogScribe private methods --------------------------------------------------

/**
 * Used to enable logprint with a tag.
 * @param tag - A tag to be printed.
 * @param payload - A message to print and log.
 */
const logprintWithTag = (tag: string, ...payload: any): void => {
  try {
    print(getTagForPrint(tag), ...payload);
    log(getTagForLog(tag), ...payload);
  } catch {
    return;
  }
};

/**
 * Sets default directory path for the log files.
 * @param {string} value - A new value to be saved.
 */
export const setLogDirPath = (value: string): void => {
  try {
    settings.logDirPath = String(value);
  } catch {
    return;
  }
};

/**
 * Sets maximum size for the log files (1000 = 1KB).
 * @param {string} value - A new value to be saved.
 */
export const setLogMaxSize = (value: number): void => {
  try {
    settings.logMaxSize = Number(value);
  } catch {
    return;
  }
};

/**
 * Sets prefix for the log files (e.g. application_).
 * @param {string} value - A new value to be saved.
 */
export const setLogPrefix = (value: string): void => {
  try {
    settings.logPrefix = String(value);
    regExp = new RegExp(`^${settings.logPrefix}_.*log`, 'g');
  } catch {
    return;
  }
};

/**
 * Disables printing.
 * @param {string} value - A new value to be saved.
 */
export const setPrintDisabled = (value: boolean): void => {
  try {
    settings.printDisabled = Boolean(value);
  } catch {
    return;
  }
};

/**
 * Returns everything this module has to provide but with a
 * global tag attached.
 * @param tag - A tag to be logged.
 * @param color A tag color to be used, e.g. "\x1b[36m".
 */
export const logscribe = (tag: string, color?: string): IlogScribe => {
  return {
    l: (...payload: any) => log(getTagForLog(tag), ...payload),
    log: (...payload: any) => log(getTagForLog(tag), ...payload),
    logprint: (...payload: any) => logprintWithTag(tag, ...payload),
    lp: (...payload: any) => logprintWithTag(tag, ...payload),
    p: (...payload: any) => print(getTagForPrint(tag, color), ...payload),
    print: (...payload: any) => print(getTagForPrint(tag, color), ...payload),
  };
};

export default logscribe;
