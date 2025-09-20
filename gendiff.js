#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1>', 'первый путь до файла')
    .argument('<filepath2>', 'второй путь до файла')
    .action((filepath1, filepath2) => {
        filepath1 = path.resolve(process.cwd(), filepath1)
        filepath2 = path.resolve(process.cwd(), filepath2)
        readFileSync(filepath1)
        readFileSync(filepath2)
    })

program.parse();

// относительный путь
// зафиксировать пути сначала path.resolve и process.cwd и скормить корректный путь readfileSync 
// надо понять как парсить разные расширения и парсить их в объект