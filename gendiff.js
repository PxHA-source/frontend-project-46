#!/usr/bin/env node
import { Command } from 'commander';
import path from 'node:path';
import { parse } from './parseFile.js';
import { compare } from './compare.js';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>', 'первый путь до файла')
    .argument('<filepath2>', 'второй путь до файла')
    .action((filepath1, filepath2) => {
        const absolutePath1 = path.resolve(__dirname, '__fixtures__', filepath1);
        const absolutePath2 = path.resolve(__dirname, '__fixtures__', filepath2);
        const parseIng1 = parse(absolutePath1)
        const parseIng2 = parse(absolutePath2)
        console.log(compare(parseIng1, parseIng2));
    })

program.parse();
