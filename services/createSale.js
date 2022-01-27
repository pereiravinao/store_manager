const { isValidSale } = require('./Validations');
const createSaleModel = require('../models/createSaleModel');

const createSale = async (arraySales) => {
  const arr = arraySales.map((sale) => {
      const productId = sale.product_id;
      const validaVenda = isValidSale(productId, sale.quantity);
      console.log('valida: ', validaVenda);
      if (validaVenda.code) { return { code: validaVenda.code, message: validaVenda.message }; }
      return {};
    });
    if (arr[0].code) return arr;
    console.log('service: ', arr);
 
  const saleCreated = await createSaleModel(arraySales);
  return [saleCreated];
}; 

module.exports = createSale;