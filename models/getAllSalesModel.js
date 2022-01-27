const connection = require('./connection');

const getAllSales = async () => {
  const [products] = await connection.execute(
      'SELECT * FROM StoreManager.sales_products;',
  );
  return products;
};

const findByIdModel = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales_products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  if (product.length === 0) return null;

  const productSelected = {
      id: product[0].id,
      name: product[0].name,
      quantity: product[0].quantity,
  };
 return productSelected;
};

module.exports = {
  getAllSales,
  findByIdModel,
};