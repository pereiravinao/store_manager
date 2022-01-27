const updateSaleModel = require('../models/updateSaleModel');
const { isValidSale } = require('./Validations');

const updateProduct = async (id, arr) => {
  const { product_id: productId, quantity } = arr[0];
  const validaVenda = isValidSale(productId, quantity);
  if (validaVenda.code) { return { code: validaVenda.code, message: validaVenda.message }; }
  await updateSaleModel(productId, quantity, id);
  const newProduct = { saleId: Number(id), itemUpdated: arr };
  return newProduct;
};

module.exports = updateProduct;