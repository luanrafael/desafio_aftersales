const servicos = require('../servicos')

const recuperarTodos = async (req, resp) => {
    resp.status(200).send(await servicos.shopify.recuperarProdutos())
}

const recuperarProdutosFavoritosTodos = async (req, resp) => {
    resp.status(200).send(await servicos.produto.recuperarFavoritos("0b023875-59a6-41a1-b06c-569ab9b509a0"))
}

const atualizarProduto = async (req, resp) => {
    resp.status(200).send(await servicos.produto.atualizarProduto("0b023875-59a6-41a1-b06c-569ab9b509a0", req.body.id_produto))
}

module.exports = {
    recuperarTodos,
    recuperarProdutosFavoritosTodos,
    atualizarProduto
}