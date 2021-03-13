const express = require('express')

const router = express.Router()

const controller = require('../controller/controller')

const { users } = require('../model/data')

// Get Users
router.get('/',controller.getUser) 

//Get Users By Id
router.get('/:id', controller.getUserById)

//Create a new user
router.post('/', controller.addUser )

// Update an existing User
router.put('/:id', controller.updateUser)

router.delete('/:id', controller.deleteUser)


module.exports = router