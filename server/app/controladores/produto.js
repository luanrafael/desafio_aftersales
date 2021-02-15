const servicos = require('../servicos')

const recuperarTodos = async (req, resp) => {
    try {
        resp.status(200).send(await servicos.shopify.recuperarProdutos())
    } catch (error) {
        resp.status(500).send({erro: true, mensagem: "erro interno!"})
        
    } 
}

const recuperarProdutosFavoritos = async (req, resp) => {
    try {
        resp.status(200).send(await servicos.produto.recuperarFavoritos(req.id_usuario))
    } catch (error) {
        resp.status(500).send({erro: true, mensagem: "erro interno!"})
        
    } 
}

const favoritar = async (req, resp) => {
    try {
        resp.status(201).send(await servicos.produto.favoritar(req.id_usuario, req.body.id_produto))
    } catch (error) {
        resp.status(500).send({erro: true, mensagem: "erro interno!"})
        
    } 
}

const desfavoritar = async (req, resp) => {
    try {
        resp.status(200).send(await servicos.produto.desfavoritar(req.id_usuario, req.body.id_produto))
    } catch (error) {
        resp.status(500).send({erro: true, mensagem: "erro interno!"})
        
    } 
}

module.exports = {
    recuperarTodos,
    recuperarProdutosFavoritos,
    favoritar,
    desfavoritar
}