const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('GET retourne tous les leaders !');
})
.post((req, res, next) => {
    res.end('POST ajoute le leader ' + req.body.name + ' avec comme détail : ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT n'est pas supporté sur /leaders");
})
.delete((req, res, next) => {
    res.end('DELETE supprime tous les leaders');
});

leaderRouter.route('/:leaderId/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('GET retourne le détail du leader '+ req.params.leaderId );
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST non supporté sur /leaders/' + req.params.leaderId );
})
.put((req, res, next) => {
    res.write('PUT pour mise à jour du leader ' + req.params.leaderId + '\n');
    res.end('PUT met à jour le leader ' + req.body.name + 
        ' en détail : ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('DELETE supprime le leader ' + req.params.leaderId);
});


module.exports = leaderRouter;

