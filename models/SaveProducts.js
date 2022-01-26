const connection = require('./connection');

const SaveProducts = async (name, quantity) => connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)',
    [name, quantity],
);

module.exports = SaveProducts;