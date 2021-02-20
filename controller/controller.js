const express = require('express')

const { users } = require('../model/data')

const router = require('../routes/users')


//USERS ENDPOINT
const getUser  =  (req, res) =>{
    res.json({status: "success", message: "Users called successfully", data: users})
}

const getUserById =  (req, res) =>{
    const user = users.find(user => user.id ===parseInt(req.params.id))
    //validate user
    if(!user) return res.status(404).json({status: "Failed", message: "User does not exist"})

    res.json({status: "success", message: "Users called successfully", data: user})
}

const addUser = (req, res) => {
    if(!req.body) return res.status(400).json({status: "Failed", message: "Invalid Request"})

    const user = {
        id : users.length + 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    }

    users.push(user)
    res.json({status: "success", message: "User created successfully", data: user})
}

const updateUser = (req, res) => {
    const user = users.find(user => user.id ===parseInt(req.params.id))
    //validate user
    if(!user) return res.status(404).json({status: "Failed", message: "User does not exist"})

    if(!req.body.email) return res.status(400).json({status: "Failed", message: "Invalid Request"})
    
    user.email = req.body.email

    res.json({status: "success", message: "User updated successfully", data: user})
}

const deleteUser = (req, res) => {
    const user = users.find(user => user.id ===parseInt(req.params.id))
    //validate user
    if(!user) return res.status(404).json({status: "Failed", message: "User does not exist"})

    const index = users.indexOf(user)
    users.splice(index, 1)
    res.json({status: "success", message: "User successfully deleted", data: user})
}

//MOVIES ENDPOINT
const getMovie = (req, res) => {
    res.json({status: "success", message: "Movies Retrieved successfully", data: movies})
}

const getMovieById = (req, res) => {
    //Retrive movie
    const movie = movies.find(movie => movie.id === parseInt(req.params.id))
    
    //Check if movie exist
    if(!movie) return res.status(404).json({status: "Failed", message: "Movie does not exist"})

    res.json({status: "success", message: "Movie successfully retrieved", data: movie})

}

const addMovie = (req, res) => {
    //Check if entered details match body schema
    if(!req.body) return res.status(400).json({status: "Failed", message: "Invalid Request"})

    const movie = {
        id: movies.length + 1,
        title: req.body.title,
        genre: req.body.genre,
        yearOfRelease: req.body.yearOfRelease
    }
    //Add movie to existing movies collection
    movies.push(movie)

    res.json({status: "success", message: "Movie successfully added", data: movie})       
}

const updateMovie = (req, res) => {
    //validate if movie exist
    const movie = movies.find(movie => movie.id === parseInt(req.params.id))
    if(!movie) return res.status(404).json({status: "Failed", message: "Movie does not exist"})
    
    //Update title or genre of movie
    if(!req.body.title || !req.body.genre) return res.status(400).json({status: "Failed", message: "Invalid Request"})

    movie.title = req.body.title
    movie.genre = req.body.genre

    res.json({status: "success", message: "Movie successfully updated", data: movie})
}

const deleteMovie = (req, res) => {
    //validate if movie exist
    const movie = movies.find(movie => movie.id === parseInt(req.params.id))

    if(!movie) return res.status(404).json({status: "Failed", message: "Movie does not exist"})

    //delete movie from movies collection
    const index = movies.indexOf(movie)
    movies.splice(index, 1)

    res.json({status:"success", message: "Movie deleted successfully", data: movie})
}

//RENTALS ENDPOINT
const getRentItem =  (req, res) => {
    res.json({status: "success", message: "Rentals successfully retreived", data: rentItems})
}

const getItemById = (req, res) => {
    const rentItem = rentItems.find(item => item.id === parseInt(req.params.id))
    if(!rentItem) return res.status(404).json({status: "Failed", message: "Item not found"})

    res.json({status:"success", message:"Item successfully retrieved", data:rentItem})
}

const addRentItem = (req, res) => {
    if(!req.body) return res.status(400).json({status: "Failed",message: "Invalid Request"})
    const item = {
        id: rentItems.length + 1,
        item: req.body.item,
        rentalFee: req.body.rentalFee,
        durationOfLease: req.body.durationOfLease
    }

    rentItems.push(item)
    res.json({status: "success", message: "New Item request successfully created", data:item})
}

const updateRentItem = (req, res) => {
    let rentItem = rentItems.find(item => item.id === parseInt(req.params.id))
    if(!rentItem) return res.status(404).json({status: "Failed", message: "Item not found"})

    if(!req.body) return res.status(400).json({status: "Failed",message: "Invalid Request"})
   
    rentItem.rentalFee = req.body.rentalFee
    rentItem.durationOfLease = req.body.durationOfLease

    res.json({status: "success", message: "Item successfully updated", data: rentItem})
}

const deleteRental = (req, res) => {
    let rentItem = rentItems.find(item => item.id === parseInt(req.params.id))
    if(!rentItem) return res.status(404).json({status: "Failed", message: "Item not found"})

    const index = rentItems.indexOf(rentItem)
    rentItems.splice(index, 1)
    res.json({status: "success", message: "Item deleted successfully", data: rentItem})
}

module.exports = {
    getUser, 
    getUserById,
    addUser, 
    updateUser, 
    deleteUser, 
    getMovie, 
    getMovieById, 
    addMovie, 
    updateMovie, 
    deleteMovie, 
    getRentItem, 
    getItemById, 
    addRentItem, 
    updateRentItem,
    deleteRental

}