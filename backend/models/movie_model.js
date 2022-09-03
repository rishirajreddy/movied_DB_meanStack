const mongoose = require('mongoose')

const movie = mongoose.Schema({
    movie_id: {
        type:String
    },
    title: {
        type:String,
    },
    budget: {
        type:String
    },
    runtime: {
        type:Number
    } ,
    poster: {
        type:String
    },
    trailer: {
        type:String
    },
    overview:{type:String},
    genres: {
        type:Array
    },
    rating: {type:String},
    language: String,
    releaseDate:String,
    production_companies: {
        type:Array
    }
})

module.exports = mongoose.model('movie', movie);