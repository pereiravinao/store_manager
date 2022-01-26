const isValid = require('../services/Validations');
const updateProduct = require('../services/updateProduct');

const atualizaProduto = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { code, message } = await isValid(name, quantity);
  if (message) return res.status(code).json({ message });
  const product = await updateProduct(name, quantity, id);
  if (product.code) return res.status(product.code).json({ message: product.message });
  res.status(200).json(product);
};

module.exports = atualizaProduto;
