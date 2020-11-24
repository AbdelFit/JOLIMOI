const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const routes = require('./routes');
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(port);
});