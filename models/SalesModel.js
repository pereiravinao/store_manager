const connection = require('./connection');

const deleteSale = async (id) => {
  const deleted = connection.execute(
    'DELETE FROM StoreManager.sales WHERE id=?',
    [id],
);
  return deleted; 
};

module.exports = {
  deleteSale,
};