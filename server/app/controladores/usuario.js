const servicos = require('../servicos');

const criar = async (req, resp) => {
    resp.status(201).send(await servicos.usuario.criar(req.body))
}

const perfil = async (req, resp) => {
    resp.status(200).send(req.sessao.usuario)
}

const autenticar = async (req, resp) => {
    try {
        let resposta = await servicos.usuario.autenticar(req.body.email, req.body.senha);
        if (resposta.erro) {
            resp.status(resposta.status || 500).send(resposta)
        } else {
            resp.status(200).send(resposta)
        }
    } catch (err) {
        console.error(err)
        resp.status(500).send({erro: true, status: 500, mensagem: "erro interno"})
    }
}

module.exports = {
 criar,
 perfil,
 autenticar
}