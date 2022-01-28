const connection = require('./connection');

const createProduct = async (name, quantity) => {
    const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)',
    [name, quantity],
);
    return insertId; 
};

module.exports = createProduct;