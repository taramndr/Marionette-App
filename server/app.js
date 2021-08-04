var express = require('express');
var cors = require('cors');

var indexRouter = require('./routes/todo');

var app = express();
const PORT = 3000;

app.use(cors());
app.use('/', indexRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
