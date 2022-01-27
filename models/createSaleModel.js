const connection = require('./connection');

const queryInsert = `INSERT INTO StoreManager.sales_products 
                    (sale_id, product_id, quantity) VALUES (?, ?, ?)`;

const queryNewSale = 'INSERT INTO StoreManager.sales () VALUE ()';

const createNewSale = async () => {
  const [{ insertId }] = await connection.query(queryNewSale);
  return insertId;
};

// Logica do forEach retirada do PR do Rodrigo Marchi, não estava enchergando a ncessidade de add primeiro no sales e dps no sales_products
const createSaleModel = async (sale) => {
  const id = await createNewSale();
  sale.forEach(async (product) => {
    await connection.query(queryInsert, [id, product.product_id, product.quantity]);
  });

  return { id, itemsSold: sale };
};
module.exports = createSaleModel;