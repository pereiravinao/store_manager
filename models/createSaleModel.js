const connection = require('./connection');

const queryInsert = `INSERT INTO StoreManager.sales_products 
                    (sale_id, product_id, quantity) VALUES (?, ?, ?)`;

// Logica do forEach retirada do PR do Rodrigo Marchi, não estava enchergando a ncessidade de add primeiro no sales e dps no sales_products
const createSaleModel = async (sale) => {
  const [{ insertId }] = await connection.execute('INSERT INTO StoreManager.sales () VALUES ()');
  console.log(insertId);
  // const [sales] = await connection.query('SELECT * FROM StoreManager.sales');
  // const id = sales.length + 1 || 1;
  // await connection.query('INSERT INTO StoreManager.sales (id) VALUE (?)', [id]);
  sale.forEach(async (product) => {
    await connection.query(queryInsert, [insertId, product.product_id, product.quantity]);
  });
  return { id: insertId, itemsSold: sale };
};

module.exports = createSaleModel;