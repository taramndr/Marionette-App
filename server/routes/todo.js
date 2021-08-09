const express = require('express');
const router = express.Router();
const uuid = require('uuid');
let myTodos = require('../data/Todos');

const idFilter = req => todo => todo.id === req.params.id;

router.get('/', function (req, res, next) {
    res.send('Index');
});

// Get All Todo
router.get('/todos', function (req, res, next) {
    res.json(myTodos);
});

// Get single Todo
router.get('/todos/:id', function (req, res, next) {
    const todoFound = myTodos.some(idFilter(req));

    if (todoFound) {
        res.json(myTodos.filter(t => t.id === req.params.id))
    } else {
        res.status(400).json({ msg: 'Requested Todo not exist' })
    }
});

// Create New Todo
router.post('/todos', function (req, res, next) {
    const { title, info } = req.body;
    const newTodo = {
        id: uuid.v4(),
        title,
        info
    }
    if (!newTodo.title || !newTodo.info) {
        return res.status(400).json({ msg: 'Please include a title and info' });
    }

    myTodos.push(newTodo);
    res.json(newTodo);
});

// Delete single Todo
router.delete('/todos/:id', function (req, res, next) {
    const todoFound = myTodos.some(idFilter(req));

    if (todoFound) {
        myTodos = myTodos.filter(t => t.id !== req.params.id);
        res.json({ msg: 'Todo deleted successfully' })
    } else {
        res.status(400).json({ msg: 'Requested Todo not exist' })
    }
});

// Update Todo
router.put('/todos/:id', function (req, res, next) {
    const todoFound = myTodos.some(idFilter(req));

    if (todoFound) {
        let todoIndex = myTodos.findIndex((obj => obj.id === req.body.id));
        myTodos[todoIndex] = req.body;

        res.json({ msg: 'Todo updated successfully' })
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

module.exports = router;