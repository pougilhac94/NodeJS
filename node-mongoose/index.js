const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((client) => {

    console.log('Connected correctly to server');
    var db = mongoose.connection;

    Dishes.create({
        name: 'Uthapizza',
        description: 'Test'
    })
    .then((dish) => {
        console.log(dish);
        
        return Dishes.findByIdAndUpdate(dish._id, {
                $set: {
                    description: 'Updated Test'
                }
            }, {
                new: true
            })
            .exec();
    })
    .then((dish) => {
        console.log(dish);
        return db.collection('dishes').drop();
    })
    .then(() => {
        return db.close();        
    })
    .catch((err) => {

    });

});