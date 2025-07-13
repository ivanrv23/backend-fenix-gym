const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares base
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🚀 Backend funcionando!');
});

module.exports = app;