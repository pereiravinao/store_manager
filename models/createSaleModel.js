const connection = require('./connection');

const queryInsert = `INSERT INTO StoreManager.sales_products 
                    (sale_id, product_id, quantity) VALUES (?, ?, ?)`;

// Logica do forEach retirada do PR do Rodrigo Marchi, não estava enchergando a ncessidade de add primeiro no sales e dps no sales_products
const createSaleModel = async (sale) => {
  const [sales] = await connection.query('SELECT MAX(id) FROM StoreManager.sales');
  const id = sales[0]['MAX(id)'] + 1 || 1;
  await connection.query('INSERT INTO StoreManager.sales (id) VALUE (?)', [id]);
  sale.forEach(async (product) => {
    await connection.query(queryInsert, [id, product.product_id, product.quantity]);
  });
  return { id, itemsSold: sale };
};

module.exports = createSaleModel;