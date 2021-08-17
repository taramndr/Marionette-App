var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/todo');

var app = express();
const PORT = 3000;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

app.use('/', indexRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
