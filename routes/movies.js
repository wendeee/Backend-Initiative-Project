const express = require('express')

const router = express.Router()

const controller = require('../controller/controller')

// const {Movie, validateMovie} = require('../model/movie')

//Get Movies
router.get('/', controller.getMovie)

//Get a movie by id
router.get('/:id', controller.getMovieById)

//Post a new movie
router.post('/', controller.addMovie)
//Update an existing movie
router.put('/:id', controller.updateMovie)

//Delete a movie
router.delete('/:id', controller.deleteMovie)


module.exports = router