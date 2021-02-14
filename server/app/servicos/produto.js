const db = require('../banco/modelos')

const atualizarProduto = async (id_usuario, id_produto_shopify) => {
    const produto_favorito = await db.produto_favorito.create({
        fk_id_usuario: id_usuario,
        fk_id_produto: id_produto_shopify
    })
    return produto_favorito
}

const recuperarFavoritos = async (id_usuario) => {
    return db.produto_favorito.findAll({where: {fk_id_usuario: id_usuario}})
}

module.exports = {
    atualizarProduto,
    recuperarFavoritos
}