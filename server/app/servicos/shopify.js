const axios = require('axios')

const CHAVE_API = '269a1ec67dfdd434dfc8622a0ed77768';
const SENHA_API = '4e788173c35d04421ab4793044be622f';
const URL_PRODUTOS = `https://${CHAVE_API}:${SENHA_API}@send4-avaliacao.myshopify.com/admin/api/2020-01/products.json`

const recuperarProdutos = async () => {
    const resposta = await axios.get(URL_PRODUTOS)
    console.log(resposta.data)
    return resposta.data
}

module.exports = {
    recuperarProdutos
}