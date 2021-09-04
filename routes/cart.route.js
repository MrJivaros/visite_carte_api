const router = require('express').Router()
const cartController = require('../controllers/cart.controller')


router.post('',cartController.createCart)
router.get('/:id', cartController.getCarteByAuthorID)
router.put('',cartController.shareCart)

module.exports = router