// import * as fs from 'fs';
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
  logMaxLength: number;
  logMaxSize: number;
  logPrefix: string;
  printDisabled: boolean;
  printMaxLength: number;
  printTagColor: string;
}

// Settings -------------------------------------------------------------------
const settings: Isettings = {
  logDirPath: appDir,
  logMaxLength: 10240,
  logMaxSize: 1024000,
  logPrefix: 'application',
  printDisabled: process.env.NODE_ENV === 'production',
  printMaxLength: 1024,
  printTagColor: '\x1b[36m',
};

// LogScribe utility methods --------------------------------------------------
export const getTagForPrint = (tag: string, color?: string): string => {
  try {
    return `${color || settings.printTagColor}${tag}\x1b[0m -`;
  } catch {
    return '';
  }
};

export const getDateForPrint = (date?: Date): string => {
  try {
    const d = date || new Date();
    const h = ('0' + d.getHours()).slice(-2);
    const m = ('0' + d.getMinutes()).slice(-2);
    const s = ('0' + d.getSeconds()).slice(-2);
    return `${h}:${m}:${s}`;
  } catch {
    return '';
  }
};

export const getTagAndDateForLog = (tag?: string, date?: Date): string => {
  try {
    const d = date || new Date();
    const h = ('0' + d.getHours()).slice(-2);
    const m = ('0' + d.getMinutes()).slice(-2);
    const s = ('0' + d.getSeconds()).slice(-2);
    return typeof tag === 'string' && tag !== ''
      ? `[${tag}]\n[${h}:${m}:${s}]\n`
      : `[${h}:${m}:${s}]\n`;
  } catch {
    return '';
  }
};

// LogScribe public methods ---------------------------------------------------
export const log = (...payload: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    // console.log(...payload);
  });
};

// Alias to log().
export const l = log;

export const print = (...payload: any): void => {
  try {
    console.log(getDateForPrint(), ...payload);
  } catch {
    return;
  }
};

// Alias to print().
export const p = print;

export const logprint = (...payload: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Print ASAP, let log take its time.
    const d = new Date();
    print(...payload);
    log(...payload, d)
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
    const d = new Date();
    print(getTagForPrint(tag), ...payload);
    log(getTagAndDateForLog(tag, d), ...payload)
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

export const setLogMaxLength = (value: number): void => {
  try {
    settings.logMaxLength = Number(value);
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

export const setPrintMaxLength = (value: number): void => {
  try {
    settings.printMaxLength = Number(value);
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
    l: (...payload: any) => log(getTagAndDateForLog(tag), ...payload),
    log: (...payload: any) => log(getTagAndDateForLog(tag), ...payload),
    logprint: (...payload: any) => logprintWithTag(tag, ...payload),
    lp: (...payload: any) => logprintWithTag(tag, ...payload),
    p: (...payload: any) => print(getTagForPrint(tag, color), ...payload),
    print: (...payload: any) => print(getTagForPrint(tag, color), ...payload),
  };
};
