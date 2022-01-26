const { findByIdModel } = require('../models/getAllProducts');

const findId = async (id) => {
  const product = await findByIdModel(id);
  if (!product) return { code: 404, message: 'Product not found' };
  return product;
};

module.exports = findId;
