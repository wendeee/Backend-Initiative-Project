const mongoose = require('mongoose')

const Joi = require('joi')

const Schema = mongoose.Schema

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    genre: {
        type: String,
        required: true,
        minlength: 3
    },
    yearOfRelease: {
        type: Number,
        required: true
    }
})

const Movie = mongoose.model('movie', movieSchema)

function validateMovie(movie){
    const schema = Joi.object().keys({
        title: Joi.string().min(3).max(50).required(),
        genre: Joi.string().min(3).max(50).required(),
        yearOfRelease: Joi.number().required()
    })

    return schema.validate(movie)
}

exports.Movie = Movie,
exports.validateMovie = validateMovie