const express = require('express')
const app = express()
const userController = require('../controllers/userController')
const authValid = require('../middleware/authMiddle')

app.route('/register')
    .post(userController.create_user)
    
app.route('/login')
    .post(userController.login_user)

app.get('/users',authValid,userController.get_all_user)

module.exports = app 