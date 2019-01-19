import * as fs from 'fs';
import * as path from 'path';
const isTesting = process.env.NODE_ENV === 'testing';
if (!isTesting) {
  require.main = process.mainModule;
}
const appDir = isTesting
  ? path.resolve(__dirname)
  : path.dirname(require.main.filename);

export interface IglobalOptions {
  dirPath?: string;
  disabledTags?: Array<string | null>;
  filePrefix?: string;
  maxMsgLength?: number;
  printColor?: string;
  printConsole?: boolean;
}

// Here we have the default configuration for LogScribe.
const globalOptions: IglobalOptions = {
  dirPath: appDir,
  disabledTags: [],
  filePrefix: 'application',
  maxMsgLength: 8192,
  printColor: '\x1b[32m',
  printConsole: true,
};

// File-regex.
const regex = new RegExp(/^application_.*log/, 'g');

// Maximum size of a log file.
const maxFileSize = 1000000;

// Use these to save some precious microseconds.
const oArr = Object.keys(globalOptions);
const oLen = oArr.length;

/**
 * Reads, validates and returns customized options for a
 * log run.
 * @param {object} options - User generated custom options.
 * @returns {object} - Validated options.
 */
const readLocalOptions = (options: IglobalOptions): IglobalOptions => {
  try {
    const custom: IglobalOptions = {};
    for (let i = 0; i < oLen; i++) {
      custom[oArr[i]] =
        typeof options[oArr[i]] === typeof globalOptions[oArr[i]]
          ? options[oArr[i]]
          : globalOptions[oArr[i]];
    }
    return custom;
  } catch {
    return globalOptions;
  }
};

/**
 * Returns a file path.
 * @param {string} dirPath - A custom or default directory path.
 * @param {string} filePrefix - Prefix for the file.
 * @returns {Promise<string>} - A full absolute filepath.
 */
const getFilePath = (dirPath: string, filePrefix): Promise<string> => {
  return new Promise((resolve, reject) => {
    const dir = path.resolve(dirPath);
    fs.readdir(dir, (err, items) => {
      if (!err) {
        const r =
          filePrefix === 'application'
            ? regex
            : new RegExp(`^${filePrefix}_.*log`, 'g');
        // Returns e.g. application_2019_01_19_123123123.log.
        const file = items
          .filter(f => f.match(r))
          .find(f => fs.statSync(`${dir}\\${f}`).size < maxFileSize);
        if (file) {
          resolve(`${dir}\\${file}`);
        } else {
          // Generate a filename as no suitable file was found.
          const d = new Date();
          resolve(
            `${dir}\\${filePrefix}_${d.getFullYear()}_${d.getMonth()}_` +
              `${d.getDate()}_${d.getTime()}.log`
          );
        }
      } else {
        // TODO: create folders.
        reject('');
      }
    });
  });
};

/**
 * Returns a file path (synchronized).
 * @param {string} dirPath - A custom or default directory path.
 * @param {string} filePrefix - Prefix for the file.
 * @returns {Promise<string>} - A full absolute filepath.
 */
const getFilePathSync = (dirPath: string, filePrefix): string => {
  try {
    const dPath = path.resolve(dirPath);
    const items = fs.readdirSync(dPath);
    if (items) {
      const r =
        filePrefix === 'application'
          ? regex
          : new RegExp(`^${filePrefix}_.*log`, 'g');
      // Returns e.g. application_2019_01_19_123123123.log.
      const file = items
        .filter(f => f.match(r))
        .find(f => fs.statSync(`${dPath}\\${f}`).size < maxFileSize);
      if (file) {
        return `${dPath}\\${file}`;
      }
      // Generate a filename as no suitable file was found.
      const d = new Date();
      return (
        `${dPath}\\${filePrefix}_${d.getFullYear()}_${d.getMonth()}_` +
        `${d.getDate()}_${d.getTime()}.log`
      );
    }
    return '';
  } catch {
    return '';
  }
};

/**
 * Returns a string that is formatted for logging.
 * @param {any} msg - A message to be logged.
 * @param {Date} date - Datetime of the log.
 * @param {string} tag - A tag of the log, if any.
 * @param {IglobalOptions} options - Custom options, if any.
 */
export const getLogStr = (
  msg: any,
  date: Date,
  tag?: string,
  options?: IglobalOptions
): string => {
  try {
    let str = '';
    // Attach tag.
    if (typeof tag === 'string' && tag !== '') {
      str += `[${tag}]\n`;
    }
    // Attach date.
    str += `[${date}]\n`;
    // Attach message.
    str +=
      typeof msg === 'string'
        ? `${msg.substr(0, options.maxMsgLength)}\n\n`
        : `${msg}\n\n`;
    // Return the result.
    return str;
  } catch {
    return '';
  }
};

/**
 * Prints out a message.
 * @param {any} msg - The message text.
 * @param {string} tag - Tag to be used, if any.
 * @param {IglobalOptions} options - Custom options, if any.
 * @param {Date} date - Date, if any.
 */
export const print = (
  msg: any,
  tag?: string,
  options?: IglobalOptions,
  date?: Date
): void => {
  try {
    const opt = options ? readLocalOptions(options) : globalOptions;
    const pStr = tag && tag !== '' ? `[${tag}]` : '';
    const d = date || new Date();
    const h = ('0' + d.getHours()).slice(-2);
    const m = ('0' + d.getMinutes()).slice(-2);
    const s = ('0' + d.getSeconds()).slice(-2);
    console.log(`${opt.printColor}${pStr}[${h}:${m}:${s}] -\x1b[0m`, msg);
  } catch {
    console.log('');
  }
};

/**
 * Creates a log.
 * @param {string} msg - A message to log and print.
 * @param {string} tag - A tag for the message.
 * @param {boolean} doPrint - Whether to print console.log.
 * @param {object} options - Custom options for the execution.
 * @returns {void} - The generated string.
 */
export const log = (
  msg: string,
  tag: string,
  doPrint: boolean,
  options: IglobalOptions
): void => {
  new Promise(() => {
    const opt = options ? readLocalOptions(options) : globalOptions;
    getFilePath(opt.dirPath, opt.filePrefix).then((filepath: string) => {
      if (
        // Empty path means something failed.
        filepath !== '' &&
        !opt.disabledTags.includes('*') &&
        !opt.disabledTags.includes(tag)
      ) {
        const date = new Date();
        fs.appendFile(filepath, getLogStr(msg, date, tag, opt), 'utf8', err => {
          if (doPrint === true || (doPrint === undefined && opt.printConsole)) {
            print(msg, tag, opt, date);
          }
        });
      }
    });
  });
};

/**
 * Creates a log (synchronized).
 * @param {string} msg - A message to log and print.
 * @param {string} tag - A tag for the message.
 * @param {boolean} doPrint - Whether to print console.log.
 * @param {object} options - Custom options for the execution.
 * @returns {void} - The generated string.
 */
export const logSync = (
  msg: string,
  tag: string,
  doPrint: boolean,
  options: IglobalOptions
): void => {
  try {
    const opt = options ? readLocalOptions(options) : globalOptions;
    const filepath = getFilePathSync(opt.dirPath, opt.filePrefix);
    if (
      // Empty path means something failed.
      filepath !== '' &&
      !opt.disabledTags.includes('*') &&
      !opt.disabledTags.includes(tag)
    ) {
      const date = new Date();
      fs.appendFileSync(filepath, getLogStr(msg, date, tag, opt), 'utf8');
      if (doPrint === true || (doPrint === undefined && opt.printConsole)) {
        print(msg, tag, opt, date);
      }
    }
  } catch {
    return;
  }
};

/**
 * Returns the currently active
 * global options.
 * @returns {object} - The current global options.
 */
export const getGlobalOptions = (): IglobalOptions => {
  return globalOptions;
};

/**
 * Overrides either some or all of the global options.
 * @param {object} options - New custom global options.
 * @returns {object} - The current global options after the modification.
 */
export const setGlobalOptions = (options: IglobalOptions): IglobalOptions => {
  try {
    for (let i = 0; i < oLen; i++) {
      if (typeof options[oArr[i]] === typeof globalOptions[oArr[i]]) {
        globalOptions[oArr[i]] = options[oArr[i]];
      }
    }
    return globalOptions;
  } catch {
    return globalOptions;
  }
};

// Used for tests.
export const testUtil = (): any => {
  return isTesting
    ? {
        getFilePath,
        getFilePathSync,
        globalOptions,
        readLocalOptions,
      }
    : {};
};

export default log;
