const express = require('express');
const path = require('path');
const env = require('dotenv').config()
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const indexRouter = require('./routes/router')
app.use('/', indexRouter);
// Static Middleware
app.use(express.static(path.join(__dirname, 'public')))


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(express.static(__dirname + '/views'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	
  	console.log('Server is started on http://127.0.0.1:'+PORT);
});
