const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const createProduct = require('./controllers/createProduct');
const getAllProducts = require('./controllers/getAllProducts');
const findProductById = require('./controllers/findProductById');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', findProductById);

app.route('/products')
  .post(createProduct)
  .get(getAllProducts);

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
