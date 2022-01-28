const { isValidSale } = require('./Validations');
const { createSaleModel } = require('../models/createSaleModel');

const createSale = async (arraySales) => {
  const arr = await Promise.all(arraySales.map(async (sale) => {
      const validaVenda = await isValidSale(sale.product_id, sale.quantity);
      if (validaVenda.code) { return { code: validaVenda.code, message: validaVenda.message }; }
      return {};
    }));
    if (arr[0].code) return arr;
 
  const saleCreated = await createSaleModel(arraySales);
  return [saleCreated];
}; 

module.exports = createSale;