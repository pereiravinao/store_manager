const ProductsModel = require('../models/ProductsModel');

const updateEstoque = async (quantity, productId, deleteSale) => {
  const getQuantity = await ProductsModel.getQuantity(productId);
  if (getQuantity.length > 0) {
    if (deleteSale) {
      const newQuantity = getQuantity[0].quantity + quantity;
      console.log('delete: ', newQuantity);
      await ProductsModel.updateQuantity(newQuantity, productId);
      } else {
    const newQuantity = getQuantity[0].quantity - quantity;
        await ProductsModel.updateQuantity(newQuantity, productId);
      } 
}
  };

module.exports = {
  updateEstoque,
 };