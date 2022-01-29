const salesServices = require('../services/SalesServices');

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const deleted = await salesServices.deleteSale(id);
  if (deleted.code) return res.status(deleted.code).json({ message: deleted.message });
  res.status(200).json(deleted);
};

module.exports = { deleteSale };
