const connection = require('./connection');

const UpdateProductModel = async (name, quantity, id) => connection.execute(
    'UPDATE StoreManager.products SET name=?, quantity=? WHERE id=?',
    [name, quantity, id],
);

module.exports = UpdateProductModel;