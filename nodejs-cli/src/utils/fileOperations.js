const fs = require('fs');
const path = require('path');

const todoFile = path.join(__dirname, '..','..', 'todo_list.json');
const loadTodos = () => {
    try {
        const dataBuffer = fs.readFileSync(todoFile);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const saveTodos = (todos) => {
    const dataJSON = JSON.stringify(todos, null, 2);
    fs.writeFileSync(todoFile, dataJSON);
};

module.exports = {
    loadTodos,
    saveTodos
};