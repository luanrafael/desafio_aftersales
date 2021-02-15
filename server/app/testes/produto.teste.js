process.env.NODE_ENV = 'test'
const chai = require('chai')
const servicos = require('../servicos')
const db = require('../banco/modelos')

const expect = chai.expect


before(function () {
  this.timeout(200000)
  return db.sequelize.sync({force: true})
})

describe('TESTANDO OPERAÇÕES COM PRODUTOS', function() {
  this.timeout(10000)
  let id_usuario, id_produto, id_produto2
  it('CRIANDO USUÁRIO COM SUCESSO PARA OPERACOES COM PRODUTOS', async () => {
    const retorno = await servicos.usuario.criar({nome: 'teste2', email: 'teste2@teste.com', senha: '1234'})
    id_usuario = retorno.id;
    expect(retorno.id).not.null
    expect(retorno.error).to.undefined
  })

  it('LISTAR PRODUTOS', async () => {
    const retorno = await servicos.shopify.recuperarProdutos()
    expect(retorno.products.length).to.greaterThan(0)
    id_produto = retorno.products[0].id
    id_produto2 = retorno.products[2].id
    
    describe('FAVORITOS', function() {
        it('FAVORITAR SEM ID DO PRODUTO', async () => {
            const retorno = await servicos.produto.favoritar(id_usuario, null)
            expect(retorno.erro).to.equal(true)
        })
    
        it(`FAVORITAR PRODUTO ${id_produto}`, async () => {
            const retorno = await servicos.produto.favoritar(id_usuario, id_produto)
            expect(retorno.erro).to.undefined
            expect(retorno.mensagem).to.contains('sucesso')
        })

        it(`EMAIL AGENDADO`, async () => {
            let emails = await db.email.findAll({
                where: {
                    status: true
                }
            })
            expect(emails.length).to.greaterThan(0)

        })
    
        it(`DESFAVORITAR PRODUTO`, async () => {
            let retorno = await servicos.produto.favoritar(id_usuario, id_produto2)
            expect(retorno.erro).to.undefined
            expect(retorno.mensagem).to.contains('sucesso')
            retoro = await servicos.produto.desfavoritar(id_usuario, id_produto2)
            expect(retorno.erro).to.undefined
            expect(retorno.mensagem).to.contains('sucesso')
            
        })
        
        
        
        it(`LISTAR FAVORITOS`, async () => {
            const retorno = await servicos.produto.recuperarFavoritos(id_usuario)
            expect(retorno.length).to.equal(2)
        })
        
    })

 })
})
