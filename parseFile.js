import path from 'node:path';
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';


export default parse = (filepath) => {
    const date = readFileSync(filepath, 'utf8')
    const ext = path.extname(filepath).slice(1);
    if (ext === 'json') {
        return JSON.parse(date)
    } else {
        return yaml.load(date);
    }
}