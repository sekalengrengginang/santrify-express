const express = require('express')
const router = express()
const userController = require('../controllers/userController')
const authValid = require('../middleware/authMiddle')

router.post('/register',userController.create_user)
    
router.post('/login',userController.login_user)

router.get('/users',authValid,userController.get_all_user)

module.exports = router