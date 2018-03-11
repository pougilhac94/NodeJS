const express = require('express'),
    http = require('http'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    dishRouter = require('./routes/dishRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/dishes', dishRouter);

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>Vous êtes sur le serveur Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Le serveur tourne sur http://${hostname}:${port}/`);
});