const SalesModel = require('../models/SalesModel');
const getAllSalesModel = require('../models/getAllSalesModel');

const deleteSale = async (id) => {
  const saleDeleted = await getAllSalesModel.findByIdModel(id);
  if (!saleDeleted) { return { code: 404, message: 'Sale not found' }; }
  await SalesModel.deleteSale(id);
  return saleDeleted;
};

module.exports = { deleteSale };