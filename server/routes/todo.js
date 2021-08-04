const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const myTodos = require('../data/Todos');

router.get('/', function (req, res, next) {
    res.send('Index');
});

// Get All Todo
router.get('/todos', function (req, res, next) {
    res.json(myTodos);
});

// Get single Todo
router.get('/todos/:id', function (req, res, next) {
    const todoFound = myTodos.some(t => t.id === parseInt(req.params.id));
    if (todoFound) {
        res.json(myTodos.filter(t => t.id === parseInt(req.params.id)))
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
    res.json(myTodos);
});

module.exports = router;