const { findByIdModel } = require('../models/getAllProducts');

const findId = async (req, res) => {
  const { id } = req.params;
  const product = await findByIdModel(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(product);
};

module.exports = findId;
