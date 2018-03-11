const express = require('express'),
    http = require('http'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.all('/dishes', (req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
});

app.get('/dishes', (req,res,next) => {
    res.end("Vous enverra tous les 'dishes'!");
});

app.get('/dishes/:dishId', (req,res,next) => {
    res.end("Vous enverra le détail du 'dish' " + req.params.dishId);
});

app.post('/dishes', (req, res, next) => {
 res.end("Ajoutera le 'dish' " + req.body.name + ' avec comme détail : ' + req.body.description);
});

app.post('/dishes/:dishId', (req, res, next) => {
    res.statusCode = 403;
    res.end("L'opération POST n'est pas supportée sur /dishes/"+ req.params.dishId);
});

app.put('/dishes', (req, res, next) => {
  res.statusCode = 403;
  res.end("L'opération PUT n'est pas supportée sur /dishes");
});

app.put('/dishes/:dishId', (req, res, next) => {
  res.write('Mise à jour du dish: ' + req.params.dishId + '\n');
  res.end('Mettra à jour le dish: ' + req.body.name + 
        ' avec le détail : ' + req.body.description);
});
 
app.delete('/dishes', (req, res, next) => {
    res.end("Supprime tous les 'dishes'");
});

app.delete('/dishes/:dishId', (req, res, next) => {
    res.end('Suppression du dish: ' + req.params.dishId);
});

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