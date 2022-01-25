const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
      'SELECT name FROM StoreManager.products;',
  );
  return products;
};
module.exports = {
  getAllProducts,
};