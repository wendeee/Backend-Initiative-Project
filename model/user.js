const mongoose = require('mongoose')

const Joi = require('joi')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
       type: String,
       required: true 
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user', userSchema)

function validateUser(user){
    const schema = Joi.object().keys({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required()
    })

    return schema.validate(user)
}
exports.userSchema = userSchema
exports.User = User
exports.validateUser = validateUser