import { testUtil } from '../index';
import * as path from 'path';

const {
  getFilePath,
  getFilePathSync,
  globalLogOptions,
  readLocalOptions,
} = testUtil();

test('getFilePathSync filepath is of correct type.', () => {
  expect(typeof getFilePathSync('./')).toBe('string');
});

test('getFilePathSync returns correct paths.', () => {
  const reference = `${path.resolve(__dirname)}\\application_`;
  const path0 = getFilePathSync('./src/__tests__');
  expect(path0.includes(reference)).toBe(true);
});

test('getFilePath filepath is of correct type.', () => {
  expect(typeof getFilePath('./')).toBe('object');
});

test('getFilePathreturns correct paths.', () => {
  const reference = `${path.resolve(__dirname)}\\application_`;
  expect.assertions(1);
  return getFilePath('./src/__tests__', 'application')
    .then((filepath) => {
      console.log('ha', filepath);
      expect(filepath.includes(reference)).toBe(true);
    });
});

test('Types of globalLogOptions are correct.', () => {
  const types = Object.keys(globalLogOptions)
    .map(k => typeof globalLogOptions[k]);
  const shouldBe = ['string', 'object', 'string', 'number', 'string', 'boolean'];
  expect(types).toEqual(shouldBe);
});

test('readLocalOptions returns an object.', () => {
  expect(typeof readLocalOptions(globalLogOptions)).toBe('object');
});

test('readLocalOptions returns globalLogOptions.', () => {
  expect(readLocalOptions(globalLogOptions)).toEqual(globalLogOptions);
});

test('readLocalOptions returns modified globalLogOptions.', () => {
  const opt = { ...globalLogOptions };
  opt.maxMsgLength = 100;
  expect(readLocalOptions(opt)).toEqual(opt);
  expect(readLocalOptions(opt)).not.toEqual(globalLogOptions);
});
