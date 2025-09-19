#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'node:fs';

const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>', 'первый путь до файла')
    .argument('<filepath2>', 'второй путь до файла')
    .action((filepath1, filepath2) => {
        console.log(filepath1)
        console.log(filepath2)
        readFileSync(filepath1)
        readFileSync(filepath2)
    })

program.parse();
