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

    let produto_favorito;
    try { 
        produto_favorito =  await db.produto_favorito.build({
            fk_id_usuario: id_usuario,
            fk_id_produto: id_produto
        })
        await produto_favorito.validate()
    } catch (erro) {
        return { erro: true, status: 400, mensagem: erro.mensagem || 'ocorreu um erro ao tentar favoritar o produto'};   
    }

    await produto_favorito.save()

    try {
        await servicoEmail.agendarEmail(id_usuario)
    } catch (error) {
        console.error('Nao consegui agendar o email')
    }

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