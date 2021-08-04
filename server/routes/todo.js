var express = require('express');
var router = express.Router();

const myTodos = require('../data/Todos');

router.get('/', function (req, res, next) {
    res.send('Index');
});

router.get('/todos', function (req, res, next) {
    res.json(myTodos);
});

module.exports = router;