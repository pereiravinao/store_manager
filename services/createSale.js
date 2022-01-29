const { isValidSale } = require('./Validations');
const { createSaleModel } = require('../models/createSaleModel');
const Estoque = require('./Estoque');

const createSale = async (arraySales) => {
  const arr = await Promise.all(arraySales.map(async (sale) => {
      const validaVenda = await isValidSale(sale.product_id, sale.quantity);
      if (validaVenda.code) { return { code: validaVenda.code, message: validaVenda.message }; }
      const updateEstoque = await Estoque.updateEstoque(sale.quantity, sale.product_id);
      if (updateEstoque.code) {
    console.log('isNotFunction:', updateEstoque);

        return { code: updateEstoque.code, message: updateEstoque.message }; 
}
      return {};
    }));
    if (arr[0].code) return arr;
 
  const saleCreated = await createSaleModel(arraySales);
  return [saleCreated];
}; 

module.exports = createSale;