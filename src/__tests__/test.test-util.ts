import { testUtil } from '../index';
import * as path from 'path';

const {
  getFilePath,
  getFilePathSync,
  globalLogOptions,
  readLocalLogOptions,
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
    .then((filepath: string) => {
      expect(filepath.includes(reference)).toBe(true);
    });
});

test('Types of globalLogOptions are correct.', () => {
  const types = Object.keys(globalLogOptions)
    .map(k => typeof globalLogOptions[k]);
  const shouldBe = ['string', 'object', 'string', 'number', 'string', 'boolean'];
  expect(types).toEqual(shouldBe);
});

test('readLocalLogOptions returns an object.', () => {
  expect(typeof readLocalLogOptions(globalLogOptions)).toBe('object');
});

test('readLocalLogOptions returns globalLogOptions.', () => {
  expect(readLocalLogOptions(globalLogOptions)).toEqual(globalLogOptions);
});

test('readLocalLogOptions returns modified globalLogOptions.', () => {
  const opt = { ...globalLogOptions };
  opt.maxMsgLength = 100;
  expect(readLocalLogOptions(opt)).toEqual(opt);
  expect(readLocalLogOptions(opt)).not.toEqual(globalLogOptions);
});
