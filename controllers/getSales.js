const { getAllSales } = require('../models/getAllSalesModel');

const getSales = async (req, res) => {
  const sales = await getAllSales();
  res.status(200).json(sales);
};

module.exports = getSales;