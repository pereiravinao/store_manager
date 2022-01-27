const connection = require('./connection');

const updateSaleModel = async (productId, quantity, id) => connection.execute(
    'UPDATE StoreManager.sales_products SET sale_id=? produc_id=?, quantity=? WHERE id=?',
    [id, productId, quantity, id],
);

module.exports = updateSaleModel;