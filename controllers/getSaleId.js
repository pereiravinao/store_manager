const { findByIdModel } = require('../models/getAllSalesModel');

const getSaleId = async (req, res) => {
  const { id } = req.params;
  const sales = await findByIdModel(id);
  if (!sales) return res.status(404).json({ message: 'Sale not found' });
  res.status(200).json(sales);
};

module.exports = getSaleId;