const { getAllProducts } = require('../models/getAllProducts');

const isRequired = '"name" is required';
const isQtdRequired = '"quantity" is required';
const isIdRequired = '"product_id" is required';
const isNotLength = '"name" length must be at least 5 characters long';
const productExists = 'Product already exists';
const isNotNumber = '"quantity" must be a number larger than or equal to 1';

const isValidName = async (name) => {
  const products = await getAllProducts();
  const product = products.find((p) => p.name === name);
  if (!name) return { code: 400, message: isRequired };
  if (name.length < 5) return { code: 422, message: isNotLength };
  if (product) return { code: 409, message: productExists };
  return {};
};

const isValidQtd = (quantity) => {
  if (!quantity && quantity !== 0) return { code: 400, message: isQtdRequired };
  if (typeof quantity !== 'number' || quantity < 1) return { code: 422, message: isNotNumber };
  return {};
};

const isValid = async (name, quantity) => {
  const products = await getAllProducts();
  const id = Math.max(...products.map((e) => e.id)) + 1;
  const validaName = await isValidName(name);
  const validaQtd = isValidQtd(quantity);
  if (validaQtd.code) return isValidQtd(quantity);
  if (validaName.code) return isValidName(name);
  return { id };
};

const isValidProductId = (productId) => {
  if (!productId) return { code: 400, message: isIdRequired };
  return {};
};

const isValidSale = (productId, quantity) => {
  const validaIdProduto = isValidProductId(productId);
  const validaQtd = isValidQtd(quantity);
  if (validaIdProduto.code) return validaIdProduto;
  if (validaQtd.code) return validaQtd;
  return {};
};

module.exports = { isValid, isValidSale };