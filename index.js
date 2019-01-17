const fs = require('fs');
const path = require('path');
const appDir = path.dirname(require.main.filename);

// Default settings.
const defaultConfig = {
  filename: 'application',
  path: appDir,
  ext: 'log',
  timestamps: true,
  maxSize: 1000000, // 1000 = 1KB, 1000000 = 1MB.
  maxStrLength: 1024,
  disabledTags: [],
};

// Allowed types for different settings.
const types = {
  filename: 'string',
  path: 'string',
  ext: 'string',
  timestamps: 'boolean',
  maxSize: 'number',
  maxStrLength: 'number',
  disabledTags: 'object',
};

/**
 * Validates a custom config object. Only valid options
 * are registered.
 * @param {object} customConfig - Config object to process.
 * @returns {object} - Validated config.
 */
const getCustomizedConfig = customConfig => {
  try {
    let result = {};
    Object.keys(defaultConfig).forEach(key => {
      if (
        customConfig[key] !== undefined &&
        types[key] === typeof customConfig[key]
      ) {
        result[key] = customConfig[key];
      } else {
        result[key] = defaultConfig[key];
      }
    });
    return result;
  } catch (e) {
    return defaultConfig;
  }
};

/**
 * Creates the log file if necessary.
 * @param {string} path - Full path to the file.
 * @returns {boolean} - True if file is now usable.
 */
const createFileIfNecessary = path => {
  try {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, '');
    }
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Returns a full path to the file with a filenames and extension.
 * E.g. c:/myFile.txt
 * @param {string} - Directory (c:/)
 * @param {string} - Filename (myFile)
 * @param {string} - Ext (.txt)
 * @returns {string} - The filepath.
 */
const getFullPath = (path, filename, ext) => {
  try {
    return path[path.length - 1] === '/'
      ? `${path}${filename}.${ext}`
      : `${path}/${filename}.${ext}`;
  } catch (e) {
    return '';
  }
};

/**
 * Makes sure the log file doesn't get too big.
 * @param {string} path - Full path to the file.
 * @param {number} maxSize - Maximum size for the file.
 * @returns {boolean} - True if a successful trim.
 */
const trimFile = (path, maxSize) => {
  try {
    if (fs.statSync(path).size > maxSize) {
      // The file has gotten too large.
      // Truncate.
      fs.truncateSync(path, 0);
    }
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Logs a string to a log file.
 * @param {string} str - The string to log.
 * @param {string} tag - Tags are used to categorize messages.
 * @param {object} customConfig - Custom config if any (optional).
 * @returns {string} - Returns what was logged.
 */
const log = (str = '', tag = '', customConfig) => {
  try {
    const c =
      typeof customConfig === 'object'
        ? getCustomizedConfig(customConfig)
        : defaultConfig;
    const fullPath = getFullPath(c.path, c.filename, c.ext);
    if (
      fullPath !== '' &&
      createFileIfNecessary(fullPath) &&
      trimFile(fullPath, c.maxSize) &&
      typeof tag === 'string' &&
      !c.disabledTags.includes('*') &&
      !c.disabledTags.includes(tag)
    ) {
      let msg = '';
      if (tag.trim() !== '') {
        msg += `[${tag}]\n`;
      }
      if (c.timestamps) {
        msg += `${new Date()}\n`;
      }
      msg += str;
      fs.appendFileSync(
        fullPath,
        `${msg.substr(0, c.maxStrLength)}\n\n`,
        'utf8'
      );
      return msg;
    }
    return '';
  } catch (e) {
    return '';
  }
};

/**
 * A simple method to set config values that the
 * logging follows.
 * @param {object} options - New overrides.
 * @returns {object} - The used config options.
 */
const set = options => {
  try {
    if (typeof options === 'object') {
      Object.keys(defaultConfig).forEach(key => {
        if (options[key] !== undefined && typeof options[key] === types[key]) {
          defaultConfig[key] = options[key];
        }
      });
    }
    return defaultConfig;
  } catch (e) {
    return {};
  }
};

/**
 * Returns the current config.
 * @returns {object} - The current configuration.
 */
const getConfig = () => {
  try {
    return defaultConfig;
  } catch (e) {
    return {};
  }
};

/**
 * Disables a tag, meaning that messages that use
 * the tag won't be logged.
 * @param {string} tag - Tag to disable.
 */
const disable = tag => {
  try {
    if (typeof tag === 'string') {
      if (!defaultConfig.disabledTags.includes(tag)) {
        defaultConfig.disabledTags.push(tag);
      }
    }
    return defaultConfig.disabledTags;
  } catch (e) {
    return defaultConfig.disabledTags;
  }
};

/**
 * Enables a tag, meaning that tags that used to be
 * disabled are now enabled. By default tags are
 * enabled.
 * @param {string} tag - Tag to enable.
 */
const enable = tag => {
  try {
    if (tag === '*') {
      defaultConfig.disabledTags = [];
    } else if (typeof tag === 'string') {
      const i = defaultConfig.disabledTags.indexOf(tag);
      if (i !== -1) {
        defaultConfig.disabledTags.splice(i, 1);
      }
    }
    return defaultConfig.disabledTags;
  } catch (e) {
    return defaultConfig.disabledTags;
  }
};

module.exports = {
  set,
  log,
  getCustomizedConfig,
  getFullPath,
  createFileIfNecessary,
  trimFile,
  getConfig,
  disable,
  enable,
};
