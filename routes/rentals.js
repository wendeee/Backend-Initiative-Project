const express = require('express')

const router = express.Router()

const controller = require('../controller/controller')

router.get('/', controller.getRentItem)

router.get('/:id', controller.getItemById)

router.post('/', controller.addRentItem)

router.put('/:id', controller.updateRentItem)

router.delete('/:id', controller.deleteRental)

module.exports = router