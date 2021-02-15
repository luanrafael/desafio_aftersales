const express = require('express')

const router = express.Router()
const controladores = require('../controladores')

router
.get('/', controladores.usuario.perfil)

module.exports = router