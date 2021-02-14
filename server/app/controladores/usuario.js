const servicos = require('../servicos');

const criar = async (req, resp) => {
    resp.status(201).send(await servicos.usuario.criar(req.body))
}


const atualizar = async (req, resp) => {
    resp.status(200).send('atualizar')
}


const autenticar = async (req, resp) => {
    resp.status(200).send('autenticar')
}

module.exports = {
 criar,
 atualizar,
 autenticar
}