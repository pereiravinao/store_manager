const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const createProductModel = require('../../models/createProduct');
const UpdateProductModel = require('../../models/updateProductsModel');
const deleteProductModel = require('../../models/deleteProductModel');
const updateSaleModel = require('../../models/updateSaleModel');
const {getAllProducts, findByIdModel} = require('../../models/getAllProducts');
const { createSaleModel, createNewSale } = require('../../models/createSaleModel');
const { getAllSales, findByIdModel: findByIdModelSale } = require('../../models/getAllSalesModel');



const product = {
  noName: { quantity: 2},
  invalidName: { name: "abc", quantity: 2},
  noQuantity: { name: "Algum produto"},
  invalidQuantity: { name: "Outro Produto", quantity: "letra"},
  correct: { name: 'Primeiro Produto', quantity: 4 },
  returnCreate: {id: 1, name: 'Primeiro Produto', quantity: 4 },
  returnUptade: {id: 1, name: 'Produto Atualizado', quantity: 400 }
}

const sales = { 
  createSale: { productId: 1, quantity: 3},
  returnSaleCreate: {id: 1, product_id: 1, quantity: 4},
  allSales: { saleId: 1, quantity: 3, product_id: 1, date: 20220128},
  saleById: { quantity: 1, product_id: 1, date: 20220128}
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

describe('Criar nova Venda no BD', () => {
  describe('Adiciona venda no Banco de Dados Sales', async () => { 
    before(async () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
    });
    after(async () => {
      connection.query.restore();
    });
    it('verifica se retorna um array vazio', async () => { 
      const item = await createNewSale();
      expect(item).to.be.equal(1);
    });
  });

  describe('Adiciona venda no Banco de Dados Product Sales', async () => { 
    before(async () => {
      sinon.stub(connection, 'query').resolves([sales.returnSaleCreate]);
    });
    after(async () => {
      connection.query.restore();
    });
    it('verifica se retorna um objeto', async () => {
      const item = await createSaleModel([sales.createSale]);
      expect(item).to.be.an('object');
    });
    it('o objeto não esta vazio', async () => {
      const item = await createSaleModel([sales.createSale]);
      expect(item).to.not.be.empty;
    });
    it('verifica se o objeto retornado possui as chaves id e itemsSold', async () => {
      const item = await createSaleModel([sales.createSale]);
      expect(item).to.include.all.keys('id', 'itemsSold');
    });
    });
  });

  describe('Busca vendas no BD', () => {
    describe('retorna todas as vendas listadas no BD', async () => { 
      before(async () => {
        sinon.stub(connection, 'execute').resolves([sales.allSales]);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('verifica se retorna um objeto', async () => {
        const item = await getAllSales();
        expect(item).to.be.an('object');
      });
      it('o objeto não esta vazio', async () => {
        const item = await getAllSales();
        expect(item).to.not.be.empty;
      });
      it('verifica se o objeto retornado possui as chaves saleId, date, quantity e product_id', async () => {
        const item = await getAllSales();
        expect(item).to.include.all.keys('saleId', 'date', 'quantity', 'product_id');
      });
    });

    describe('retorna a venda do ID selecionado', async () => { 
      before(async () => {
        sinon.stub(connection, 'execute').resolves([[sales.saleById]]);
      });
      after(async () => {
        connection.execute.restore();
      });
      it('verifica se retorna um array', async () => {
        const item = await findByIdModelSale(1);
        expect(item).to.be.an('array');
      });
      it('o objeto não esta vazio', async () => {
        const item = await findByIdModelSale(1);
        expect(item).to.not.be.empty;
      });
      it('verifica se o objeto retornado possui as chaves date, quantity e product_id', async () => {
        const item = await findByIdModelSale(1);
        expect(item[0]).to.include.all.keys('date', 'quantity', 'product_id');
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
        const item = await findByIdModelSale(3);
        expect(item).to.be.null;
      });
    });
  });

  describe('Atualizar Venda no BD', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });
    after(async () => {
      connection.execute.restore();
    });
    it('verifica se retorna valor undefined', async () => { 
      const item = await updateSaleModel(1, 3, 1);
      expect(item).to.be.undefined;
    });
  });