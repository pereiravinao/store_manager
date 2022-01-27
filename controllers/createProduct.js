const { isValid } = require('../services/Validations');
const saveInDB = require('../models/SaveProducts');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, message } = await isValid(name, quantity);
  if (message) return res.status(code).json({ message });
  const id = await saveInDB(name, quantity);
  res.status(201).json({ name, quantity, id });
};

module.exports = createProduct;
