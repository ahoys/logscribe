import * as fs from 'fs';
import * as path from 'path';
import { IglobalOptions } from './types';
require.main = process.mainModule;
const appDir = path.dirname(require.main.filename);

// Here we have the default configuration for Filescribe.
const globalOptions: IglobalOptions = {
  dirPath: `${appDir}/`,
  disabledTags: [],
  maxMsgLength: 8192,
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
 * Returns a full file path.
 * @param {string} dirPath - Full path to the log directory.
 * @returns {string} - Filepath.
 */
const getFilePath = (dirPath: string): string => {
  try {
    const files = fs.readdirSync(dirPath);
    const file = files
      .filter(i => i.match(regex))
      .find(f => fs.statSync(`${dirPath}${f}`).size < maxFileSize);
    if (file) {
      return `${dirPath}${file}`;
    }
    return '';
  } catch {
    return '';
  }
};

/**
 * Creates and possibly splits log files.
 * @param {object} - Possibly custom options.
 * @returns {string} - Path to the log file. Empty string if failure.
 */
const createFile = (opt: IglobalOptions): string => {
  try {
    const { dirPath } = opt;
    let filepath = getFilePath(dirPath);
    if (filepath === '') {
      const d = new Date();
      const filename = `application_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}_${d.getTime()}.log`;
      filepath = `${dirPath}${filename}`;
      fs.writeFileSync(filepath, '');
    }
    return filepath;
  } catch {
    return '';
  }
};

/**
 * Creates a log.
 * @param {string} msg - A message to log and print.
 * @param {string} tag - A tag for the message.
 * @param {boolean} print - Whether to print console.log.
 * @param {object} options - Custom options for the execution.
 * @returns {string} - The generated string.
 */
export const log = (
  msg: string,
  tag: string,
  print: boolean,
  options: IglobalOptions
): string => {
  try {
    const opt = options ? readLocalOptions(options) : globalOptions;
    const filepath = createFile(opt);
    if (
      // Empty path means something failed.
      filepath !== '' &&
      !opt.disabledTags.includes('*') &&
      !opt.disabledTags.includes(tag)
    ) {
      let str = '';
      if (tag && tag !== '') {
        str += `[${tag}]\n`;
      }
      const d = new Date();
      str += `${d}\n${msg.substr(0, opt.maxMsgLength)}\n\n`;
      fs.appendFileSync(filepath, str, 'utf8');
      if (print && process && process.stdout) {
        const pStr = tag && tag !== '' ? `[${tag}]` : '';
        const h = ('0' + d.getHours()).slice(-2);
        const m = ('0' + d.getMinutes()).slice(-2);
        console.log('\x1b[32m', `${pStr}[${h}:${m}] -\x1b[0m`, msg);
      }
      return str;
    }
    return '';
  } catch {
    return '';
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

export default log;
