const updateSale = require('../services/updateSale');

const updateSales = async (req, res) => {
  const { id } = req.params;
  const arrayRecived = req.body;
  const saleUpdated = updateSale(id, arrayRecived);
  if (saleUpdated[0].code) {
    return res.status(saleUpdated[0].code).json({ message: saleUpdated[0].message }); 
  }
  res.status(200).json(saleUpdated);
};

module.exports = updateSales;