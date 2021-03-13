const mongoose = require('mongoose')

const Joi = require('joi')

const Schema = mongoose.Schema



const rentalSchema = new Schema({
   
    item:String,
    rentalFee: String,
    quantity: Number,
    durationOfLease: String,
    name: String,
    contact: Number,
    address: String
   
})

const Rental = mongoose.model('rental', rentalSchema)

function validateRental(rental){
    const schema = Joi.object().keys({
        item: Joi.string().required(),
        rentalFee: Joi.string(),
        quantity: Joi.number().required(),
        durationOfLease: Joi.string().required(),
        name: Joi.string().required(),
        contact: Joi.number().min(6).required(),
        address: Joi.string().required()  
        
    })
    return schema.validate(rental)
}

exports.Rental = Rental
exports.validateRental = validateRental