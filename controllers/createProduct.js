const isValidName = require('../services/Validations');

const createProduct = (req, res) => {
  const { name } = req.body;
  const { code, message } = isValidName(name);
  if (message) return res.status(code).json({ message }); 
  res.status(201).json({ message: 'Cadastro efetuado' });
};

module.exports = createProduct;
