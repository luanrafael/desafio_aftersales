const db = require('../banco/modelos')
const jwt = require('jsonwebtoken')
const config = require('../config')

const criar = async (dados) => {
    const usuario = await db.usuario.create(dados)
    return usuario
}

const autenticar = async (email, senha) => {

    const usuario = await db.usuario.findOne({where: {email: email}});

    if (!usuario) {
        return { erro: true, status: 403, mensagem: 'email ou senha incorretos', codigo: 'CREDENCIAL_INVALIDA' };
    }

    if (usuario && usuario.get('senha') !== senha) {
        return { erro: true, status: 403, mensagem: 'email ou senha incorretos', codigo: 'CREDENCIAL_INVALIDA' };
    }

    let sessao = {
        id_usuario: usuario.id,
        usuario: {
            email: usuario.email,
            nome: usuario.nome
        }
    }

    let token = jwt.sign(sessao, config.secret, {
        expiresIn: 86400,
        subject: usuario.get('id')
    })

    return { token, mensagem: "usuário autenticado com sucesso" }
}


module.exports = {
    criar,
    autenticar
}