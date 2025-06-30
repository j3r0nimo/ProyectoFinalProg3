import express from 'express';
import { realizarCompra } from '../controllers/compraController.js';
import { validateCompraInput } from '../middleware/validateCompraInput.js';

const router = express.Router();

router.post('/', validateCompraInput, realizarCompra);

export default router;