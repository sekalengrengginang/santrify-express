const express = require('express')
const router = express.Router();
const classroomController = require('../controllers/classroomController')
const authValid = require('../middleware/authMiddle')

router.route('/classroom')
    .get(authValid,classroomController.get_all_classroom)
    .post(authValid,classroomController.create_classroom)

router.route('/classroom/:id')
    .get(authValid,classroomController.get_one_classroom)
    .post(authValid,classroomController.edit_classroom)

module.exports = router