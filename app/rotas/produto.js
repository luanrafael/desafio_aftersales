const express = require('express')

const router = express.Router()
const controladores = require('../controladores')

router
.get('', controladores.produto.recuperarTodos)
.get('/favoritos', controladores.produto.recuperarProdutosFavoritos)
.post('/favorito', controladores.produto.favoritar)
.delete('/favorito', controladores.produto.desfavoritar)

module.exports = router