const express = require('express')
const app = express()
const userController = require('../controllers/userController')
const authValid = require('../middleware/authMiddle')

app.post('/register',authValid, userController.get_all_user)

app.route('/login')
    .post(userController.login_user)

app.route('/users')
    .get(userController.get_all_user)

module.exports = app 