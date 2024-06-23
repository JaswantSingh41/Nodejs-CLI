#!/usr/bin/env node
const { exec } = require('child_process')

const args = process.argv.slice(2); //access the arguments from terminal

const showHelp = () => {
    console.log(`
        Usage:cli-nodejs-jass [options] [arguments]

    Options:
        -h, --help      Show help message
        -v, --version   Show version
        `)
}

const showVersion = () => {
    console.log('cli-nodejs-jass version 1.0.0');
};

const cliFun = () => {
    if(args.length === 0){
        showHelp();
        return;
    }
    switch (args[0]) {
        case '-h':
        case '--help':
            showHelp();
            break;
        case '-v':
        case '--version':
            showVersion();
            break;
        default:
            console.log(`Unknown option: ${args[0]}`);
            showHelp();
    }
}

cliFun();
