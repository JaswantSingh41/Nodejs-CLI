#!/usr/bin/env node
const { exec } = require('child_process')
const todo = require('./todo');

//access the arguments from terminal
const args = process.argv.slice(2); 

const showHelp = () => {
    console.log(`
        Usage:cli-nodejs-jass <command> [arguments]

    commands:
        -h, --help      Show help message
        -v, --version   Show version
        greet           Greet someone
        install, i      Install npm packages
        runcode         Execute JavaScript code
        open            Open any app on your window
        clear           Clear the console
        clear-all       Clear the console completely
        todo add        Add a new task to the todo list
        todo list       Display the list of todos
        todo update     Update the status of a todo
        todo delete     Delete a todo from the list
        `)
}

const showVersion = () => {
    console.log('cli-nodejs-jass version 1.0.0');
};

const greet = (args) => {
    if (args.length === 0) {
        console.log('Please provide a name to greet')
        return;
    }

    const name = args[0];
    console.log(`Hello, ${name}`);
}

const install = (args) => {
    if (args.length === 0) {
        console.log('Please provide at least one package to install.');
        return;
    }
    const packages = args.join(' ');
    console.log(`Installing packages: ${packages}`);

    exec(`npm install ${packages}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error installing packages: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log('Packages installed successfully.');
    });
}

const runCode = (args) => {
    if (args.length === 0) {
        console.log('Please provide JavaScript code to run.');
        return;
    }

    const code = args.join(' ');

    try {
        const result = eval(code);
        console.log('Result:', result);
    } catch (error) {
        console.error('Error:', error.message);
    }
};


const open = (args) => {
    if (args.length === 0) {
        console.log('Please provide the name of the application to open.');
        return;
    }

    const appName = args.join(' ');
    const command = `start "" "${appName}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error opening application: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`${appName} opened successfully.`);
    });
}

const clear = () => {
    console.clear();
    console.log('Console cleared.');
}

const clearAll = () => {
    console.clear();
    console.log('Console cleared completely.');
}

const cliFun = () => {
    if (args.length === 0) {
        showHelp();
        return;
    }
    const [command, ...commandArgs] = args;

    switch (command) {
        case '-h':
        case '--help':
            showHelp();
            break;
        case '-v':
        case '--version':
            showVersion();
            break;
        case 'greet':
            greet(commandArgs);
            break;
        case 'install':
        case 'i':
            install(commandArgs);
            break;
        case 'runcode':
            runCode(commandArgs);
            break;
        case 'open':
            open(commandArgs);
            break;
        case 'clear':
            clear();
            break;
        case 'clear-all':
            clearAll();
            break;
        case 'todo':
            todo(commandArgs);
            break;
        default:
            console.log(`Unknown option: ${args[0]}`);
            showHelp();
    }
}

cliFun();
