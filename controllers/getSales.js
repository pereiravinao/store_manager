const { getAllSales } = require('../models/getAllSalesModel');

const getSales = async (_req, _res) => {
  const sales = await getAllSales();
  console.log(sales);
};

module.exports = getSales;