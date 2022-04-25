const mongoose = require('mongoose')

const hero = new mongoose.Schema({ 
        slug: String,
        name: String,
        power: [String],
        color: String,
        isAlive: Boolean,
        age: Number,
        image: String
});

const heroModel = mongoose.model('Hero', hero);

module.exports = heroModel