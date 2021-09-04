const authController = require('../controllers/auth.controller');
const router = require('express').Router()




router.post('/login',authController.connexion)
router.post('/register',authController.signUp)
router.get('',authController.getAll)





module.exports = router
