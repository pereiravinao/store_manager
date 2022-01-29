const connection = require('./connection');

const getQuantity = async (productId) => {
  const [quantity] = await connection.execute(
      'SELECT quantity FROM StoreManager.products WHERE id=?;', [productId],
  );
  return quantity;
};

const updateQuantity = async (qty, productId) => {
  const [quantity] = await connection.execute(
    'UPDATE StoreManager.products SET quantity=? WHERE id=? ;', [qty, productId],
  );
  return quantity;
};

module.exports = { 
  getQuantity,
  updateQuantity,
};