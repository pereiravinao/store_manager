const { getAllProducts } = require('../models/getAllProducts');

const isRequired = '\"name\" is required';
const isNotLength = '"name" length must be at least 5 characters long';
const productExists = 'Product already exists';

const isValidName = async (name) => {
  const products = await getAllProducts();
  const product = products.some((p) => p !== name);
  if (!name) return { code: 400, message: isRequired };
  if (name.length < 5) return { code: 422, message: isNotLength };
  if (product) return { code: 409, message: productExists };
  
  return {};
};

module.exports = isValidName;