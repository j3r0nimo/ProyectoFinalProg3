import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';   // <== Import the DB connection

import clienteRoutes from './routes/clienteRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import compraRoutes from './routes/compraRoutes.js';



// test line
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// Chequeo de variables críticas
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
  throw new Error('Faltan variables de entorno para la conexión a la base de datos');
}

const app = express();

app.use(cors());          // To attend frontend req res
app.use(express.json());  // To parse JSON bodies

app.use('/clientes', clienteRoutes);
app.use('/tickets', ticketRoutes);      // Solo habilitamos lectura de disponibilidad de tickets
app.use('/compras', compraRoutes);

// Ruta básica en servicio. It is optional: health route check
console.log('Servidor arrancando, configurando rutas...');
app.get('/', (req, res) => {
  console.log('GET / recibido');
  res.send('Nuestra API está funcionando correctamente');
});

// Manejo de errores genérico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Tuvimos un problema con el servidor' });
});

// test DB connection & iniciar el sitio si se conectó a la BDD
sequelize.sync({ alter: true })         // en desarrollo
  .then(() => {
    console.log('Tablas sincronizadas con la base de datos');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
      console.log(`Acceda desde http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });