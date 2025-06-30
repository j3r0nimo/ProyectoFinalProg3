// src/routes/ticketRoutes.js
import express from 'express';
import { getDisponibilidadPorSector } from '../controllers/ticketController.js';

const router = express.Router();

router.get('/disponibilidad', getDisponibilidadPorSector);

export default router;