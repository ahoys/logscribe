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

// Interfaces -----------------------------------------------------------------
export interface IlogScribe {
  l: (...payload: any) => Promise<string>;
  log: (...payload: any) => Promise<string>;
  logprint: (...payload: any) => Promise<string>;
  lp: (...payload: any) => Promise<string>;
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
const settings: Isettings = {
  logDirPath: appDir,
  logMaxSize: 1024000,
  logPrefix: 'application',
  printDisabled: process.env.NODE_ENV === 'production',
  printTagColor: '\x1b[36m',
};

let regExp = new RegExp(`^${settings.logPrefix}_.*log`, 'g');

// LogScribe utility methods --------------------------------------------------

/**
 * Returns a tag that is suitable for printting.
 * @param {string} tag - Tag to be printed.
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

export const getTagForLog = (tag?: string): string => {
  try {
    return typeof tag === 'string' && tag !== '' ? `[${tag}]` : '[]';
  } catch {
    return '[]';
  }
};

// LogScribe public methods ---------------------------------------------------
export const log = (...payload: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readdir(settings.logDirPath, (err, items) => {
      if (err) {
        reject('');
      } else {
        const existingLog = items
          .filter(f => f.match(regExp))
          .find(
            f =>
              fs.statSync(`${settings.logDirPath}\\${f}`).size <
              settings.logMaxSize
          );
        const d = new Date();
        let filepath = '';
        if (existingLog) {
          filepath = `${settings.logDirPath}\\${existingLog}`;
        } else {
          filepath =
            `${settings.logDirPath}\\${settings.logPrefix}_` +
            `${d.getFullYear()}-` +
            `${d.getMonth()}-` +
            `${d.getDate()}-` +
            `${d.getTime()}.log`;
        }
        const msg = `${d}\n${payload.join('\n')}\n\n`;
        fs.appendFile(filepath, msg, 'utf8', aErr => {
          if (aErr) {
            reject('');
          } else {
            resolve(msg);
          }
        });
      }
    });
  });
};

// Alias to log().
export const l = log;

export const print = (...payload: any): void => {
  try {
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

export const logprint = (...payload: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Print ASAP, let log take its time.
    print(...payload);
    log(...payload)
      .then(logValue => {
        resolve(logValue);
      })
      .catch(() => {
        reject('');
      });
  });
};

// Alias to logprint();
export const lp = logprint;

// LogScribe private methods --------------------------------------------------
const logprintWithTag = (tag: string, ...payload: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    print(getTagForPrint(tag), ...payload);
    log(getTagForLog(tag), ...payload)
      .then(logValue => {
        resolve(logValue);
      })
      .catch(() => {
        reject('');
      });
  });
};

export const setLogDirPath = (value: string): void => {
  try {
    settings.logDirPath = String(value);
  } catch {
    return;
  }
};

export const setLogMaxSize = (value: number): void => {
  try {
    settings.logMaxSize = Number(value);
  } catch {
    return;
  }
};

export const setLogPrefix = (value: string): void => {
  try {
    settings.logPrefix = String(value);
    regExp = new RegExp(`^${settings.logPrefix}_.*log`, 'g');
  } catch {
    return;
  }
};

export const setPrintDisabled = (value: boolean): void => {
  try {
    settings.printDisabled = Boolean(value);
  } catch {
    return;
  }
};

export const setPrintTagColor = (value: string): void => {
  try {
    settings.printTagColor = String(value);
  } catch {
    return;
  }
};

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
