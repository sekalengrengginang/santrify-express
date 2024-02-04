const express = require('express')
const router = express.Router();
const santriControllers = require('../controllers/santriController')

router.route('/santri')
    .get(santriControllers.getSantri)
    .post(santriControllers.postSantri)

module.exports = router