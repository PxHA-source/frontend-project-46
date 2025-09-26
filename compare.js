import _ from "lodash"

export const compare = (data1, data2) => {
    let str = '';
    const keys = _.sortedUniq(Object.keys(data1).concat(Object.keys(data2)));
    for (const key of keys) {
        if (!data1.hasOwnProperty(key) && data2.hasOwnProperty(key)) {
            str += `+ ${key}: ${data2[key]}`
        } else if (data1.hasOwnProperty(key) && !data2.hasOwnProperty(key)) {
            str += `- ${key}: ${data1[key]}`
        } else if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key) && data1[key] === data2[key]) {
            str += `${key}: ${data1[key]}`
        } else {
            str += `- ${key}: ${data1[key]} + ${key}: ${data2[key]}`
        }
    }
    return str;
}