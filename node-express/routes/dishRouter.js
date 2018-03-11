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
    res.end('PUT non supporté sur /dishes');
})
.delete((req, res, next) => {
    res.end('Suppression de tous les dishes');
});

module.exports = dishRouter;

