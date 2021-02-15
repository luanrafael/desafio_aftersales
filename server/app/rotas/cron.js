const express = require('express')

const router = express.Router()
const controladores = require('../controladores')

router
.get('/email', controladores.cron.enviarEmails)
module.exports = router