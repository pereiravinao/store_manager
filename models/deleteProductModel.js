const connection = require('./connection');

const deleteProductModel = async (id) => connection.execute(
    'DELETE FROM StoreManager.products WHERE id=?',
    [id],
);

module.exports = deleteProductModel;