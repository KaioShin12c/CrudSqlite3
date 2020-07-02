const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const sqlite3 = require('sqlite3').verbose();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.set('views', './views');

const routes = require('./public/js/routes')(app, sqlite3);

const server = app.listen(3000, () => {
   console.log('listening on port %s...', server.address().port);
});
