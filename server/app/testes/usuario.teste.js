process.env.NODE_ENV = 'test'
const chai = require('chai')
const servicos = require('../servicos')
const db = require('../banco/modelos')

const expect = chai.expect


before(function () {
  this.timeout(200000)
  return db.sequelize.sync({force: true})
})

describe('Testando operações com usuários', function() {
  this.timeout(10000)
  

  it('CRIANDO USUÁRIO SEM EMAIL', async () => {
    const retorno = await servicos.usuario.criar({nome: 'teste', senha: '1234'})
    expect(retorno.erro).to.equal(true)
  })

  it('CRIANDO USUÁRIO COM EMAIL INVÁLIDO', async () => {
    const retorno = await servicos.usuario.criar({nome: 'teste', email: 'teste', senha: '1234'})
    expect(retorno.erro).to.equal(true)
  })


  it('CRIANDO USUÁRIO COM SUCESSO', async () => {
    const retorno = await servicos.usuario.criar({nome: 'teste', email: 'teste@teste.com', senha: '1234'})
    expect(retorno.id).not.null
    expect(retorno.error).to.undefined
  })

  describe('Testando operações com usuários - AUTENTICACAO', function() {
    it('AUTENTICADO COM SUCESSO', async () => {
        const retorno = await servicos.usuario.criar({email: 'teste@teste.com', senha: '1234'})
        expect(retorno.token).not.null
        expect(retorno.error).to.undefined
    })

    it('AUTENTICADO NAO AUTENTICADO', async () => {
        const retorno = await servicos.usuario.criar({email: 'teste@teste.com', senha: '1234444444'})
        expect(retorno.erro).to.equal(true)

    })
})

  
})
