const updateSaleModel = require('../models/updateSaleModel');
const { findByIdModel } = require('../models/getAllSalesModel');
const { isValidSale } = require('./Validations');

const updateProduct = async (id, arr) => {
  const { product_id: productId, quantity } = arr;
  const validSale = arr.map((sale) => {
    const validaVenda = isValidSale(sale.product_id, sale.quantity);
    if (validaVenda.code) { return { code: validaVenda.code, message: validaVenda.message }; }
    return {};
  });
  if (validSale[0].code) return validSale;
  await updateSaleModel(productId, quantity, id);
  const newProduct = await findByIdModel(productId);
  return newProduct;
};

module.exports = updateProduct;