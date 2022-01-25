const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const createProduct = require('./controllers/createProduct');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', createProduct);

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
