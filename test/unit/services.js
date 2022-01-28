const sinon = require('sinon');
const { expect } = require('chai');
const getAllProducts = require('../../models/getAllProducts');
const connection = require('../../models/connection');

const { isValid, isValidSale, isValidProductId, isValidName, isValidQtd } = require('../../services/Validations');

const product = {
  returnCreate: {id: 1, name: 'Primeiro Produto', quantity: 4 }
}

const sales = { 
  createSale: { productId: 1, quantity: 3},
  returnSaleCreate: {id: 1, product_id: 1, quantity: 4},
  allSales: { saleId: 1, quantity: 3, product_id: 1, date: 20220128},
  saleById: { quantity: 1, product_id: 1, date: 20220128}
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
      expect(result.code).to.be.equal(400)
    });
    it('Retorna erro 422 se NAME menor que 5 letras', async () => {
      const result = await isValidName('abcd');
      expect(result.code).to.be.equal(422)
    });
    it('Retorna erro 400 se QUANTITY não existir', async () => {
      const result = await isValid();
      expect(result.code).to.deep.equal(400)
    });
    it('Retorna erro 422 se QUANTITY for diferente de um numero', async () => {
      const result = await isValidQtd('abcd');
      expect(result.code).to.be.equal(422)
    });
  });

  describe('Validando infos para cadastrar nova venda:', async () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[sales.createSale]]);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('Retorna erro 400 se productId não existir', async () => {
      const result = await isValidProductId();
      expect(result.code).to.be.equal(400)
    });
    it('Retorna erro 400 se QUANTITY não existir', async () => {
      const result = await isValidSale();
      expect(result.code).to.deep.equal(400)
    });
    it('Retorna erro 422 se QUANTITY for menor ou igual a zero', async () => {
      const result = await isValidQtd(0);
      expect(result.code).to.be.equal(422)
    });
  });
})