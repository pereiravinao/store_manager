const connection = require('./connection');

const updateSaleModel = async (productId, quantity, id) => connection.execute(
    'UPDATE StoreManager.sales_products SET product_id=?, quantity=? WHERE sale_id=?',
    [productId, quantity, id],
);

module.exports = updateSaleModel;