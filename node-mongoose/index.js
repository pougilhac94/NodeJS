const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((client) => {

    console.log('Connected correctly to server');
    var db = mongoose.connection;

    Dishes.create({
        name: 'Uthappizza',
        description: 'test'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: 'Updated test en recherchant le dish par id'}
        },{ 
            new: true 
        })
        .exec();
    })
    .then((dish) => {
        console.log(dish);
        dish.description='Updated test directement sur le dish en mémoire';
        return dish.save();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);

        return db.collection('dishes').drop();
    })
    .then(() => {
        return db.close();
    })
    .catch((err) => {
        console.log(err);
    });

});