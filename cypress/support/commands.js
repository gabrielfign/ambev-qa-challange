Cypress.Commands.add('cadastrarUsuario', (usuario) => {
  return cy
    .request({
      method: 'POST',
      url: `${Cypress.expose('apiUrl')}/usuarios`,
      body: usuario,
    })
    .then((resposta) => {
      expect(resposta.status).to.eq(201)

      return { ...usuario, _id: resposta.body._id }
    })
})

Cypress.Commands.add('cadastrarUsuarioNaTela', (usuario) => {
  cy.visit('/cadastrarusuarios')
  cy.get('[data-testid="nome"]').type(usuario.nome, { parseSpecialCharSequences: false })
  cy.get('[data-testid="email"]').type(usuario.email)
  cy.get('[data-testid="password"]').type(usuario.password, {
    log: false,
    parseSpecialCharSequences: false,
  })

  if (usuario.administrador === 'true') {
    cy.get('[data-testid="checkbox"]').check({ force: true })
  }

  cy.get('[data-testid="cadastrar"]').click()
})

Cypress.Commands.add('adicionarPrimeiroProdutoNaLista', () => {
  return cy.get('h5.card-title').should('be.visible').first().invoke('text').then((nome) => {
    const produto = nome.trim()

    cy.contains('h5.card-title', produto)
      .parents('.card')
      .find('[data-testid="adicionarNaLista"]')
      .click()

    return cy.wrap(produto)
  })
})
