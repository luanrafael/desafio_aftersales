const express = require('express')

const router = express.Router()
const controladores = require('../controladores')

router
.post('/', controladores.usuario.criar)
.post('/autenticar', controladores.usuario.autenticar)

module.exports = router