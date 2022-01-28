const sinon = require('sinon');
const { expect } = require('chai');
const getAllProducts = require('../../models/getAllProducts');
const connection = require('../../models/connection');

const { isValid, isValidSale, isValidProductId, isValidName, isValidQtd } = require('../../services/Validations');

const product = {
  noName: { quantity: 2},
  invalidName: { name: "abc", quantity: 2},
  noQuantity: { name: "Algum produto"},
  invalidQuantity: { name: "Outro Produto", quantity: "letra"},
  correct: { name: 'Primeiro Produto', quantity: 4 },
  returnCreate: {id: 1, name: 'Primeiro Produto', quantity: 4 },
  returnUptade: {id: 1, name: 'Produto Atualizado', quantity: 400 }
}

describe('Verificando as validaçãoes', async () => {
  describe('Validando infos para cadastrar novo produto:', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[product.returnCreate]]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('Retorna erro 400 se NAME não existir', async () => {
      const result = await isValid();
      expect(result.code).to.deep.equal(400)
    });
    it('Retorna erro 422 se NAME menor que 5 letras', async () => {
      const result = await isValidName('abcd');
      expect(result.code).to.be.equal(422)
    });
    it('Retorna erro 400 se QUANTITY não existir', async () => {
      const result = await isValidQtd();
      expect(result.code).to.deep.equal(400)
    });
    it('Retorna erro 422 se QUANTITY for diferente de um numero', async () => {
      const result = await isValidQtd('abcd');
      expect(result.code).to.be.equal(422)
    });
  });

  describe('Validando infos para cadastrar nova venda:', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[product.returnCreate]]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('Retorna erro 400 se productId não existir', async () => {
      const result = await isValidProductId();
      expect(result.code).to.be.equal(400)
    });
    it('Retorna erro 422 se NAME menor que 5 letras', async () => {
      const result = await isValidSale('abcd');
      expect(result.code).to.be.equal(422)
    });
    it('Retorna erro 400 se QUANTITY não existir', async () => {
      const result = await isValidQtd();
      expect(result.code).to.deep.equal(400)
    });
    it('Retorna erro 422 se QUANTITY for diferente de um numero', async () => {
      const result = await isValidQtd('abcd');
      expect(result.code).to.be.equal(422)
    });
  });
})