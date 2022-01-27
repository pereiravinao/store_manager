const { isValid } = require('../services/Validations');
const createProductModel = require('../models/createProduct');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, message } = await isValid(name, quantity);
  if (message) return res.status(code).json({ message });
  const id = await createProductModel(name, quantity);
  res.status(201).json({ name, quantity, id });
};

module.exports = createProduct;