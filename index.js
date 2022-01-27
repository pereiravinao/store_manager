const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const createProduct = require('./controllers/Product/createProduct');
const getAllProducts = require('./controllers/Product/getAllProducts');
const findProductById = require('./controllers/Product/findProductById');
const atualizaProduto = require('./controllers/Product/atualizaProduto');
const deleteProduct = require('./controllers/Product/deleteProduct');
const createNewSale = require('./controllers/Sales/createSale');

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

app.route('/sales')
  .post(createNewSale);

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
