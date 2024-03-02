const express = require('express')
const router = express.Router();
const santriControllers = require('../controllers/santriController')
const authValid = require('../middleware/authMiddle')

router.route('/santri')
    .get(santriControllers.get_all_santri)
    .post(santriControllers.create_santri)

router.route('/santri/:id')
    .get(santriControllers.get_one_santri)
    .post(santriControllers.edit_santri)

module.exports = router