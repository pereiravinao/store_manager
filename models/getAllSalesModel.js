const connection = require('./connection');

const getAllSales = async () => {
  const [products] = await connection.execute(
      `SELECT 
        sale_id AS saleId,
        quantity,
        product_id,
        date
      FROM
          StoreManager.sales_products AS sp
              INNER JOIN
          StoreManager.sales AS sl ON sl.id = sp.sale_id`,
  );
  return products;
};

const findByIdModel = async (id) => {
  const query = `SELECT 
                  quantity,
                  product_id,
                  date
                FROM
                    StoreManager.sales_products AS sp
                        INNER JOIN
                    StoreManager.sales AS sl ON sl.id = sp.sale_id
                    WHERE id = ?`;

  const [product] = await connection.execute(query, [id]);
  if (product.length === 0) return null;

 return product;
};

module.exports = {
  getAllSales,
  findByIdModel,
};