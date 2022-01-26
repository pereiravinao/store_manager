const UpdateProductModel = require('../models/updateProductsModel');
const findById = require('./findById');

const updateProduct = async (name, quantity, id) => {
  await UpdateProductModel(name, quantity, id);
  const newProduct = await findById(id);
  console.log(newProduct);
  return newProduct;
};

module.exports = updateProduct;