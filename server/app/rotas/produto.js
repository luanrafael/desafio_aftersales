const express = require('express')

const router = express.Router()
const controladores = require('../controladores')

router
.get('', controladores.produto.recuperarTodos)
.get('/favoritos', controladores.produto.recuperarProdutosFavoritosTodos)
.put('', controladores.produto.atualizarProduto)

module.exports = router