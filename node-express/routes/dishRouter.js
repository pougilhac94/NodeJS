const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Vous enverra tous les dishes !');
})
.post((req, res, next) => {
    res.end('Ajoutera le dish : ' + req.body.name + ' avec comme détail : ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT n'est pas supporté sur /dishes");
})
.delete((req, res, next) => {
    res.end('Suppression de tous les dishes');
});

dishRouter.route('/:dishId/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Vous enverra le détail de '+ req.params.dishId );
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST non supporté sur /dishes/' + req.params.dishId );
})
.put((req, res, next) => {
    res.write('Mise à jour du  dish: ' + req.params.dishId + '\n');
    res.end('Va mettre à jour le dish ' + req.body.name + 
        ' en détail : ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Suppression du dish ' + req.params.dishId);
});


module.exports = dishRouter;

