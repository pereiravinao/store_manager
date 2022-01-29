const ProductsModel = require('../models/ProductsModel');

const updateEstoque = async (quantity, productId, deleteSale) => {
  const getQuantity = await ProductsModel.getQuantity(productId);
  if (getQuantity.length > 0) {
    if (getQuantity[0].quantity - quantity < 0) { 
      return { code: 422, message: 'Such amount is not permitted to sell' }; 
      }
    if (deleteSale) {
      const newQuantity = getQuantity[0].quantity + quantity;
      await ProductsModel.updateQuantity(newQuantity, productId);
      return {};
      } 
    const newQuantity = getQuantity[0].quantity - quantity;
        await ProductsModel.updateQuantity(newQuantity, productId);
        return {};
}
  };

module.exports = {
  updateEstoque,
 };