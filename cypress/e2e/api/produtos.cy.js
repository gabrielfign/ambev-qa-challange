import { novoProduto, novoUsuario } from '../../support/usuario'

describe('API - Produtos', () => {
  it('Administrador cadastra um produto com sucesso e remove esse produto em seguida.', () => {
    const admin = novoUsuario('true')
    const produto = novoProduto()

    cy.cadastrarUsuario(admin)

    cy.request({
      method: 'POST',
      url: `${Cypress.expose('apiUrl')}/login`,
      body: {
        email: admin.email,
        password: admin.password,
      },
    }).then((login) => {
      const token = login.body.authorization

      cy.request({
        method: 'POST',
        url: `${Cypress.expose('apiUrl')}/produtos`,
        headers: { Authorization: token },
        body: produto,
      }).then((cadastro) => {
        expect(cadastro.status).to.eq(201)
        expect(cadastro.body.message).to.eq('Cadastro realizado com sucesso')
        expect(cadastro.body._id).to.be.a('string').and.not.be.empty

        cy.request({
          method: 'GET',
          url: `${Cypress.expose('apiUrl')}/produtos/${cadastro.body._id}`,
        })
          .its('body.nome')
          .should('eq', produto.nome)

        cy.request({
          method: 'DELETE',
          url: `${Cypress.expose('apiUrl')}/produtos/${cadastro.body._id}`,
          headers: { Authorization: token },
        }).then((exclusao) => {
          expect(exclusao.status).to.eq(200)
          expect(exclusao.body.message).to.eq('Registro excluído com sucesso')
        })
      })
    })
  })

  it('Sistema Recusa cadastro sem token', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.expose('apiUrl')}/produtos`,
      body: novoProduto(),
      failOnStatusCode: false,
    }).then((resposta) => {
      expect(resposta.status).to.eq(401)
      expect(resposta.body.message).to.eq(
        'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais',
      )
    })
  })

  it('Sistema recusa cadastro feito por um usuário que não é admin', () => {
    const usuario = novoUsuario('false')

    cy.cadastrarUsuario(usuario)

    cy.request({
      method: 'POST',
      url: `${Cypress.expose('apiUrl')}/login`,
      body: {
        email: usuario.email,
        password: usuario.password,
      },
    }).then((login) => {
      cy.request({
        method: 'POST',
        url: `${Cypress.expose('apiUrl')}/produtos`,
        headers: { Authorization: login.body.authorization },
        body: novoProduto(),
        failOnStatusCode: false,
      }).then((resposta) => {
        expect(resposta.status).to.eq(403)
        expect(resposta.body.message).to.eq('Rota exclusiva para administradores')
      })
    })
  })
})
