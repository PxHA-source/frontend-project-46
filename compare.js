import _ from 'lodash';

export const compare = (data1, data2) => {
  let str = '';
  const keys = _.sortedUniq(Object.keys(data1).concat(Object.keys(data2)).sort());
  
  for (const key of keys) {
    if ('object' === typeof data1[key]) {
      return compare(data1[key], data2[key])
    }
    if (!Object.hasOwnProperty.call(data1, key) && Object.hasOwnProperty.call(data2, key)) {
      str += `  + ${key}: ${data2[key]}\n`;
    } else if (Object.hasOwnProperty.call(data1, key) && !Object.hasOwnProperty.call(data2, key)) {
      str += `  - ${key}: ${data1[key]}\n`;
    } else if (Object.hasOwnProperty.call(data1, key) && Object.hasOwnProperty.call(data2, key)
    && data1[key] === data2[key]) {
      str += `    ${key}: ${data1[key]}\n`;
    } else {
      str += `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`;
    }
  }
  
  return `{\n${str}}`;
};
