const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const createProduct = require('./controllers/createProduct');
const getAllProducts = require('./controllers/getAllProducts');
const findProductById = require('./controllers/findProductById');
const atualizaProduto = require('./controllers/atualizaProduto');
const deleteProduct = require('./controllers/deleteProduct');
// const createNewSale = require('./controllers/createSale');
// const getSales = require('./controllers/getSales');
// const getSaleId = require('./controllers/getSaleId');
// const updateSale = require('./controllers/updateSale');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/products/:id')
  .get(findProductById)
  .put(atualizaProduto)
  .delete(deleteProduct);

app.route('/products')
  .post(createProduct)
  .get(getAllProducts);

// app.route('/sales/:id')
//   .get(getSaleId)
//   .put(updateSale);

// app.route('/sales')
//   .post(createNewSale)
//   .get(getSales);

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
