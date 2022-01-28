const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const createProductModel = require('../../models/createProduct');
const UpdateProductModel = require('../../models/updateProductsModel');
const deleteProductModel = require('../../models/deleteProductModel');
const {getAllProducts, findByIdModel} = require('../../models/getAllProducts');



const product = {
  noName: { quantity: 2},
  invalidName: { name: "abc", quantity: 2},
  noQuantity: { name: "Algum produto"},
  invalidQuantity: { name: "Outro Produto", quantity: "letra"},
  correct: { name: 'Primeiro Produto', quantity: 4 },
  returnCreate: {id: 1, name: 'Primeiro Produto', quantity: 4 },
  returnUptade: {id: 1, name: 'Produto Atualizado', quantity: 400 }
}

describe('Insere produto no BD', () => {
  before(async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, 'execute').resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe('quando é inserido com sucesso', () => { 
    it('retorna o ID da inserção no BD', async () => {
      const { name, quantity } = product.correct;
      const response = await createProductModel(name, quantity);

      expect(response).to.be.equal(1)
    });
  });
});

describe('Busca lista de Produtos no BD', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves([product.returnCreate]);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe('retorna os produtos', async () => { 
    it('verifica se retorna um objeto', async () => {
      const item = await getAllProducts();
      expect(item).to.be.an('object');
    });
    it('o objeto não esta vazio', async () => {
      const item = await getAllProducts();
      expect(item).to.not.be.empty;
    });
    it('verifica se o objeto retornado possui as chaves id, name, quantity', async () => {
      const item = await getAllProducts();
      expect(item).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('Busca item por ID no BD', () => {
  describe('retorna o produto de ID selecionado', async () => { 
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[product.returnCreate]]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('verifica se retorna um objeto', async () => {
      const item = await findByIdModel(1);
      expect(item).to.be.an('object');
    });
    it('o objeto não esta vazio', async () => {
      const item = await findByIdModel(1);
      expect(item).to.not.be.empty;
    });
    it('verifica se o objeto retornado possui as chaves id, name, quantity', async () => {
      const item = await findByIdModel(1);
      expect(item).to.include.all.keys('name', 'quantity');
    });
  });
  describe('Quando ID não existe', async () => { 
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('retornar valor null', async () => {
      const item = await findByIdModel(3);
      expect(item).to.be.equal(null);
    });
  });
});

describe('Atualizar Produto no BD', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves([]);
  });
  after(async () => {
    connection.execute.restore();
  });
  it('verifica se retorna um array', async () => { 
    const item = await UpdateProductModel();
    expect(item).to.be.an('array');
  });
});

describe('Deletar Produto no BD', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves([]);
  });
  after(async () => {
    connection.execute.restore();
  });
  it('verifica se retorna um array vazio', async () => { 
    const item = await deleteProductModel(1);
    expect(item).to.be.empty;
  });
});