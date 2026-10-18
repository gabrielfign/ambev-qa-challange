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
