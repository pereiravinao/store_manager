const SalesModel = require('../models/SalesModel');
const getAllSalesModel = require('../models/getAllSalesModel');
const Estoque = require('./Estoque');

const deleteSale = async (id) => {
  const saleDeleted = await getAllSalesModel.findByIdModel(id);
  if (!saleDeleted) { return { code: 404, message: 'Sale not found' }; }
  console.log(saleDeleted);
  saleDeleted.map(async (sale) => {
 await Estoque
    .updateEstoque(sale.quantity, sale.product_id, true); 
});
  // await Estoque.updateEstoque();
  await SalesModel.deleteSale(id);
  return saleDeleted;
};

module.exports = { deleteSale };