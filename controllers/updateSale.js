const updateSale = require('../services/updateSale');

const updateSales = async (req, res) => {
  const { id } = req.params;
  const arrayRecived = req.body;
  const saleUpdated = await updateSale(id, arrayRecived);
  if (saleUpdated.code) {
    return res.status(saleUpdated.code).json({ message: saleUpdated.message }); 
  }
  res.status(200).json(saleUpdated);
};

module.exports = updateSales;