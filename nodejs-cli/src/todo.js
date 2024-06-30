// For table formatting
const Table = require('cli-table3'); 

// const formatDate = require('./utils/dateFormat')
const { formatDate } = require('./utils/dateFormat');

const { loadTodos, saveTodos } = require('./utils/fileOperations');


const addTodo = (title) => {
    const todos = loadTodos();
    todos.push({
        title,
        created: new Date().toISOString(),
        completed: null,
        status: 'Pending'
    });
    saveTodos(todos);
    console.log(`Added todo: "${title}"`);
};

const listTodos = () => {
    const todos = loadTodos();
    const table = new Table({
        // head: ['Index', 'Todo Work', 'Created', 'Completed Time', 'Status'],
        head: [
            '\x1b[37m\x1b[1mIndex\x1b[0m', 
            '\x1b[37m\x1b[1mTodo Work\x1b[0m', 
            '\x1b[37m\x1b[1mCreated\x1b[0m', 
            '\x1b[37m\x1b[1mCompleted Time\x1b[0m', 
            '\x1b[37m\x1b[1mStatus\x1b[0m'
        ],
        colWidths: [5, 30, 30, 30, 15],
        chars: {
            'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
            , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
            , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
            , 'right': '║', 'right-mid': '╢', 'middle': '│'
        }
    });

    todos.forEach((todo, index) => {
        const row = [
            index + 1,
            todo.title,
            formatDate(todo.created),
            todo.completed ? formatDate(todo.completed) : '---',
            todo.status
        ];

        if (todo.status === 'Completed') {
            table.push(row.map(cell => `\x1b[32m${cell}\x1b[0m`)); 
        } else {
            table.push(row);
        }
    });

    console.log(table.toString());
};

const updateTodo = (index, completed) => {
    const todos = loadTodos();
    if (index >= 1 && index <= todos.length) {
        todos[index - 1].completed = completed ? new Date().toISOString() : null;
        todos[index - 1].status = completed ? 'Completed' : 'Pending';
        saveTodos(todos);
        console.log(`Updated todo: "${todos[index - 1].title}"`);
    } else {
        console.log('Invalid index.');
    }
};

const deleteTodo = (index) => {
    const todos = loadTodos();
    if (index >= 1 && index <= todos.length) {
        const removed = todos.splice(index - 1, 1);
        saveTodos(todos);
        console.log(`Deleted todo: "${removed[0].title}"`);
    } else {
        console.log('Invalid index.');
    }
};

module.exports = (args) => {
    const command = args[0];
    const restArgs = args.slice(1);

    switch (command) {
        case 'add':
            addTodo(restArgs.join(' '));
            break;
        case 'list':
            listTodos();
            break;
        case 'update':
            updateTodo(parseInt(restArgs[0]), restArgs[1] === 'true');
            break;
        case 'delete':
            deleteTodo(parseInt(restArgs[0]));
            break;
        default:
            console.log('Unknown todo command. Available commands: add, list, update, delete');
    }
};
