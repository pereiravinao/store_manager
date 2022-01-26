const deleteProductModel = require('../models/deleteProductModel');
const findById = require('./findById');

const updateProduct = async (id) => {
  const newProduct = await findById(id);
  await deleteProductModel(id);
  return newProduct;
};

module.exports = updateProduct;