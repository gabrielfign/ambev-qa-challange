import { fakerPT_BR as faker } from '@faker-js/faker'

export function novoUsuario(administrador = 'false') {
  const sufixo = faker.string.alphanumeric(8).toLowerCase()

  return {
    nome: faker.person.fullName(),
    email: `usuario.${sufixo}@teste.com`,
    password: faker.internet.password({ length: 10 }),
    administrador,
  }
}

export function novoProduto() {
  const sufixo = faker.string.alphanumeric(6)

  return {
    nome: `${faker.commerce.productName()} ${sufixo}`,
    preco: faker.number.int({ min: 10, max: 500 }),
    descricao: faker.commerce.productMaterial(),
    quantidade: faker.number.int({ min: 1, max: 50 }),
  }
}
