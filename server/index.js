require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { initSchema } = require('./db');
const usuariosRouter = require('./routes.usuarios');

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = (process.env.CORS_ORIGIN || '*').split(',').map((o) => o.trim());

app.use(cors({ origin: allowedOrigins.includes('*') ? '*' : allowedOrigins }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', usuariosRouter);

initSchema()
  .then(() => {
    app.listen(port, () => console.log(`API lista en el puerto ${port}`));
  })
  .catch((err) => {
    console.error('No se pudo inicializar la base de datos', err);
    process.exit(1);
  });
