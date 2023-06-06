const cors = require('cors');
const express = require('express');

//rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const repairRoutes = require('./routes/repairsRoutes');

const app = express();

//este middleware de aca me sirve para que mi servidor

//entienda formatos json que le estan llegando

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const time = new Date().toISOString();

  req.requestTime = time;
  next();
});

app.use('/api/v1/users', usuarioRoutes);
app.use('/api/v1/repairs', repairRoutes);

module.exports = app;
