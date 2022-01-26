const isValid = require('../services/Validations');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, message } = await isValid(name, quantity);
  if (message) return res.status(code).json({ message }); 
  res.status(201).json({ name, quantity, id: 1 });
};

module.exports = createProduct;
