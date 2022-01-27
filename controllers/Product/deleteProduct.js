const deleteP = require('../../services/deleteProduct');

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deleted = await deleteP(id);
  if (deleted.code) return res.status(deleted.code).json({ message: deleted.message });
  res.status(200).json(deleted);
};

module.exports = deleteProduct;
