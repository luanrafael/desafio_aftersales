const db = require('../banco/modelos')
const servicoEmail = require('./email')

const recuperarFavoritos = async (id_usuario) => {
    return await db.produto_favorito.findAll({where: {fk_id_usuario: id_usuario}})
}

const favoritar = async (id_usuario, id_produto) => {
    const favorito = await db.produto_favorito.findOne({
        where: {
            fk_id_usuario: id_usuario,
            fk_id_produto: id_produto
        }
    })

    if (favorito) {
        return {mensagem: "produto já favoritado!"}
    }

    await db.produto_favorito.create({
        fk_id_usuario: id_usuario,
        fk_id_produto: id_produto
    })

    await servicoEmail.agendarEmail(id_usuario)

    return {mensagem: "produto favoritado com sucesso!"}
}

const desfavoritar = async (id_usuario, id_produto) => {
    
    const resultado = await db.produto_favorito.destroy({
        where: {
            fk_id_usuario: id_usuario,
            fk_id_produto: id_produto
        }
    })

    await servicoEmail.agendarEmail(id_usuario)
    
    return {mensagem: resultado > 0 ? "produto desafavoritado com sucesso!" : "favorito não existente!"}
}

module.exports = {
    recuperarFavoritos,
    favoritar,
    desfavoritar
}