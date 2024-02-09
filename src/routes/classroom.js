const express = require('express')
const router = express.Router();
const classroomController = require('../controllers/classroomController')

router.route('/classroom')
    .get(classroomController.get_all_classroom)
    .post(classroomController.create_classroom)

router.route('/classroom/:id')
    .get(classroomController.get_one_classroom)
    .post(classroomController.edit_classroom)

module.exports = router