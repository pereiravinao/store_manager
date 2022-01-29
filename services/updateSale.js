const updateSaleModel = require('../models/updateSaleModel');
const { isValidSale } = require('./Validations');
const Estoque = require('./Estoque');

const updateProduct = async (id, arr) => {
  const { product_id: productId, quantity } = arr[0];
  const validaVenda = await isValidSale(productId, quantity);
  if (validaVenda.code) { return { code: validaVenda.code, message: validaVenda.message }; }
  await Estoque.updateEstoque(productId, quantity);
  await updateSaleModel(productId, quantity, id);
  const newProduct = { saleId: Number(id), itemUpdated: arr };
  return newProduct;
};

module.exports = updateProduct;