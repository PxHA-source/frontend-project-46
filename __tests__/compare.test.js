/* eslint-disable no-undef */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from '../parseFile.js';
import { compare } from '../compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('compare two JSON fixture files', () => {
  const file1Path = path.join(__dirname, '../__fixtures__/file1.json');
  const file2Path = path.join(__dirname, '../__fixtures__/file2.json');

  const data1 = parse(file1Path);
  const data2 = parse(file2Path);

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  const result = compare(data1, data2);

  expect(result).toEqual(expected);
});
