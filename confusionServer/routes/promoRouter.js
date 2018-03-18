const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('GET retourne toutes les promotions !');
})
.post((req, res, next) => {
    res.end('POST ajoute la promotion : ' + req.body.name + ' avec comme détail : ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT n'est pas supporté sur /promotions");
})
.delete((req, res, next) => {
    res.end('DELETE supprime toutes les promotions');
});

promoRouter.route('/:promoId/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('GET retourne le détail de la promotion '+ req.params.promoId );
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST non supporté sur /promotions/' + req.params.promoId );
})
.put((req, res, next) => {
    res.write('Mise à jour de la promotion ' + req.params.promoId + '\n');
    res.end('PUT met à jour la promotion ' + req.body.name + 
        ' en détail : ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('DELETE supprime la promotion ' + req.params.promoId);
});


module.exports = promoRouter;

