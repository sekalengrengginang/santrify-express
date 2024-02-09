const express = require('express')
const router = express.Router();
const teacherController = require('../controllers/teacherController')

router.route('/teacher')
    .get(teacherController.get_all_teacher)
    .post(teacherController.create_teacher)

router.route('/teacher/:id')
    .get(teacherController.get_one_teacher)
    .post(teacherController.edit_teacher)

module.exports = router