const servicos = require('../servicos')

const enviarEmails = async (req, resp) => {
    await servicos.email.listarEmails()
    resp.status(200).send("ok")
}

module.exports = {
    enviarEmails
}