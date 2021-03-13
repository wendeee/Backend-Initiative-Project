const {Movie, validateMovie} = require('../model/movie')
const { User, validateUser } = require('../model/user')
const { Rental, validateRental} = require('../model/rental')

//USERS ENDPOINT
const getUser  =  async(req, res) =>{
    const users = await User.find()
    res.json({status: "success", message: "Users called successfully", data: users})
}

const getUserById =  async (req, res) =>{
    const user = await User.findById(req.params.id)
    //validate user
    if(!user) return res.status(404).json({status: "Failed", message: "User does not exist"})

    res.json({status: "success", message: "Users called successfully", data: user})
}

const addUser = async (req, res) => {
    //validate request body parameters
    const { error } = validateUser(req.body);
    if(error) return res.status(400).json({status: "Failed", message: "Invalid Request"})

    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    })
    user = await user.save()

    // user = await user.save()
    res.json({status: "success", message: "User created successfully", data: user})
}

const updateUser = async (req, res) => {
    //validate request body parameters
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findByIdAndUpdate(req.params.id, {
        email: req.body.email
    }, {new: true})
    
    //validate user
    if(!user) return res.status(404).json({status: "Failed", message: "User does not exist"})
    res.json({status: "success", message: "User updated successfully", data: user})
}

const deleteUser = async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id)
    //validate user
    if(!user) return res.status(404).json({status: "Failed", message: "The user with the given ID was not found"})
    res.json({status: "success", message: "User successfully deleted", data: user})
}

//MOVIES ENDPOINT
const getMovie = async (req, res) => {
    const movies = await Movie.find()
    res.json({status: "success", message: "Movies Retrieved successfully", data: movies})
}

const getMovieById = async (req, res) => {
    //Retrive movie
    const movie = await Movie.findById(req.params.id)
    
    //Check if movie exist
    if(!movie) return res.status(404).json({status: "Failed", message: "The movie with the given ID was not found"})

    res.json({status: "success", message: "Movie successfully retrieved", data: movie})

}

const addMovie = async (req, res) => {
    //Validate error 
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let movie = new Movie({
        title: req.body.title,
        genre: req.body.genre,
        yearOfRelease: req.body.yearOfRelease
    })
    //Save movie to existing movies collection
    movie = await movie.save()

    res.json({status: "success", message: "Movie successfully added", data: movie})       
}

const updateMovie = async (req, res) => {
    //validate request body parameters
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message);
   
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: req.body.genre
    }, { new: true})

     //validate if movie exist
    if(!movie) return res.status(404).json({status: "Failed", message: "The movie with the given ID was not found"})
    
    res.json({status: "success", message: "Movie successfully updated", data: movie})
}

const deleteMovie = async (req, res) => {
   
    //delete movie from movies collection
    const movie = await Movie.findByIdAndRemove(req.params.id)

    //validate if movie exist
    if(!movie) return res.status(404).json({status: "Failed", message: "The movie with the given ID was not found"})

    res.json({status:"success", message: "Movie deleted successfully", data: movie})
}

//RENTALS ENDPOINT
const getRentItem =  async (req, res) => {
    const rentItems = await Rental.find()
    res.json({status: "success", message: "Rentals successfully retreived", data: rentItems})
}

const getItemById = async (req, res) => {
    const rentItem = await Rental.findById(req.params.id)
    if(!rentItem) return res.status(404).json({status: "Failed", message: "The rentItem with the given ID was not found"})

    res.json({status:"success", message:"Item successfully retrieved", data:rentItem})
}


const addRentItem = async (req, res) => {
    //validate request body parameters
    const { error } = validateRental(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let rentItem = new Rental({

            item: req.body.item,
            rentalFee: req.body.rentalFee,
            quantity: req.body.quantity,
            durationOfLease: req.body.durationOfLease,
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address           
    })
    rentItem = await rentItem.save()
    res.json({status: "success", message: "New Item request successfully created", data:rentItem})
}

const updateRentItem = async (req, res) => {
    //validate request body parameters
    const { error } = validateRental(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    //update rental
    let rentItem = await Rental.findByIdAndUpdate(req.params.id, {
    
        item: req.body.item,
        rentalFee: req.body.rentalFee,
        quantity: req.body.quantity,
        durationOfLease: req.body.durationOfLease,
        name: req.body.name,
        contact: req.body.contact,
        address: req.body.address
    }, {new: true})

    
    //validate if item with the given Id exist
    if(!rentItem) return res.status(404).json({status: "Failed", message: "The rentItem with the given ID was not found"})
    res.json({status: "success", message: "Item successfully updated", data: rentItem})
}

const deleteRental = async (req, res) => {
    //delete rental from rentals collection
    let rentItem = await Rental.findByIdAndRemove(req.params.id)

    //validate if rental with given Id  exist
    if(!rentItem) return res.status(404).json({status: "Failed", message: "The rentItem with the given ID was not found"})

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