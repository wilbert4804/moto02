const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

//rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const repairRoutes = require('./routes/repairsRoutes');

const app = express();

//este middleware de aca me sirve para que mi servidor

//entienda formatos json que le estan llegando

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/users', usuarioRoutes);
app.use('/api/v1/repairs', repairRoutes);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`cant find ${req.originalUrl} on this server!`, 404)
  );
});

app.use((err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

/*app.use((req, res, next) => {
  const time = new Date().toISOString();

  req.requestTime = time;
  next();
});*/

module.exports = app;
