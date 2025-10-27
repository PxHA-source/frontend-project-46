import _ from 'lodash';

const makeIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);
const makeBracketIndent = (depth, spacesCount = 4) => ' '.repeat((depth - 1) * spacesCount);

export const compare = (data1, data2, depth = 1) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const lines = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const indent = makeIndent(depth);

    // если ключа нет в первом, но есть во втором
    if (!Object.hasOwnProperty.call(data1, key)) {
      return `${indent}+ ${key}: ${formatValue(value2, depth + 1)}`;
    }

    // если ключа нет во втором, но есть в первом
    if (!Object.hasOwnProperty.call(data2, key)) {
      return `${indent}- ${key}: ${formatValue(value1, depth + 1)}`;
    }

    // если оба значения — объекты → рекурсивно
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return `${indent}  ${key}: ${compare(value1, value2, depth + 1)}`;
    }

    // если значения равны
    if (_.isEqual(value1, value2)) {
      return `${indent}  ${key}: ${formatValue(value1, depth + 1)}`;
    }

    // если значения разные
    return [
      `${indent}- ${key}: ${formatValue(value1, depth + 1)}`,
      `${indent}+ ${key}: ${formatValue(value2, depth + 1)}`
    ].join('\n');
  });

  return `{\n${lines.join('\n')}\n${makeBracketIndent(depth)}}`;
};

// вспомогательная функция для форматирования значений
const formatValue = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }

  const entries = Object.entries(value).map(
    ([key, val]) => `${makeIndent(depth + 1)}  ${key}: ${formatValue(val, depth + 1)}`
  );

  return `{\n${entries.join('\n')}\n${makeBracketIndent(depth + 1)}}`;
};

