const createSale = require('../../services/createSale');

const createNewSale = async (req, res) => {
  const arraySales = req.body;
  const saleValidation = await createSale(arraySales);
  if (saleValidation[0].code) {
    return res.status(saleValidation[0].code).json({ message: saleValidation[0].message }); 
  }
  
  console.log('controller: ', saleValidation[0]);
  res.status(201).json(saleValidation[0]);
};

module.exports = createNewSale;