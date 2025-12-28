/* eslint-disable no-undef */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '../parseFile.js';
import { compare } from '../compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file1Path = path.join(__dirname, '../__fixtures__/file1.json');
const file2Path = path.join(__dirname, '../__fixtures__/file2.json');

const data1 = parse(file1Path);
const data2 = parse(file2Path);

const expectedFullCompare = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('compare two JSON plain files', () => {
  const result = compare(data1, data2);
  expect(result).toEqual(expectedFullCompare);
});

test('compare partially modified plain objects', () => {
    const small1 = { a: 1, b: 2 };
    const small2 = { a: 1, b: 3 };
    const expected = `{
    a: 1
  - b: 2
  + b: 3
}`;

    expect(compare(small1, small2)).toEqual(expected);
});

test('parse JSON and YAML produce the same plain object', () => {
    const jsonPath = path.join(__dirname, '../__fixtures__/file1.json');
    const ymlPath = path.join(__dirname, '../__fixtures__/file2.yaml');
    
    const dataJson = parse(jsonPath);
    const dataYml = parse(ymlPath);

    expect(dataJson).toEqual(dataYml);
});

test('compare with only one plain object (second is missing)', () => {
    const data1 = { a: 1, b: 2 };
    const data2 = undefined;
    
    expect(() => {
    compare(data1, data2);
  }).toThrow();
});

test('compare two Yaml fixture plain files', () => {
  const file1PathYaml = path.join(__dirname, '../__fixtures__/file1.yaml');
  const file2PathYaml = path.join(__dirname, '../__fixtures__/file2.yaml');

  const data1 = parse(file1PathYaml);
  const data2 = parse(file2PathYaml);
  const result = compare(data1, data2); 
  expect(result).toEqual(expectedFullCompare);
});
