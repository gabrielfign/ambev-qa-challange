import { novoProduto, novoUsuario } from '../../support/usuario'

describe('Cadastro de produto', () => {
  it('Administrador cadastra um produto e vê ele na listagem', () => {
    const admin = novoUsuario('true')
    const produto = novoProduto()

    cy.cadastrarUsuarioNaTela(admin)

    cy.contains('Cadastro realizado com sucesso').should('be.visible')
    cy.url({ timeout: 10000 }).should('include', '/admin/home')

    cy.visit('/admin/cadastrarprodutos')
    cy.get('[data-testid="nome"]').type(produto.nome, { parseSpecialCharSequences: false })
    cy.get('[data-testid="preco"]').type(String(produto.preco))
    cy.get('[data-testid="descricao"]').type(produto.descricao, { parseSpecialCharSequences: false })
    cy.get('[data-testid="quantity"]').type(String(produto.quantidade))
    cy.get('[data-testid="cadastarProdutos"]').click()

    cy.url().should('include', '/admin/listarprodutos')
    cy.contains('td', produto.nome).should('be.visible')
  })
})

describe('Lista de compras', () => {
  it('Cliente adiciona um produto na lista de compras', () => {
    const cliente = novoUsuario()

    cy.cadastrarUsuarioNaTela(cliente)

    cy.contains('Cadastro realizado com sucesso').should('be.visible')

    cy.adicionarPrimeiroProdutoNaLista().then((nome) => {
      cy.url().should('include', '/minhaListaDeProdutos')
      cy.get('[data-testid="shopping-cart-product-name"]').should('contain', nome)
    })
  })
})

describe('Carrinho', () => {
  it('Cliente envia a lista para o carrinho', () => {
    const cliente = novoUsuario()

    cy.cadastrarUsuarioNaTela(cliente)

    cy.contains('Cadastro realizado com sucesso').should('be.visible')

    cy.adicionarPrimeiroProdutoNaLista()

    cy.url().should('include', '/minhaListaDeProdutos')
    cy.get('[data-testid="adicionar carrinho"]').click()

    cy.url().should('include', '/carrinho')
    cy.contains('Em construção aguarde').should('be.visible')
  })
})
