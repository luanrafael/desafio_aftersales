const db = require('../banco/modelos')

const criar = async (dados) => {
    const usuario = await db.usuario.create(dados)
    return usuario
}

module.exports = {
    criar
}