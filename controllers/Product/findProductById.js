const findById = require('../services/findById');

const findId = async (req, res) => {
  const { id } = req.params;
  const product = await findById(id);
  if (product.code) return res.status(product.code).json({ message: product.message });
  res.status(200).json(product);
};

module.exports = findId;
