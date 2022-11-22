#! /usr/bin/env node

const { program } = require('commander');

program.command('run').description('Copy given files and run').action();

program.parse();
