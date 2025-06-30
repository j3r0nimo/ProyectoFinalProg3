// middleware/validateCompraInput.js

import { SECTORES_CON_PRECIOS } from '../constants/ticketConfig.js';

export function validateCompraInput(req, res, next) {
  const { clienteId, cantidad, sector } = req.body;

  // clienteId
  if (!clienteId || !/^\d+$/.test(clienteId)) {
    return res.status(400).json({ error: 'clienteId inválido o faltante.' });
  }

  // cantidad
  const parsedCantidad = parseInt(cantidad, 10);
  if (isNaN(parsedCantidad) || parsedCantidad <= 0) {
    return res.status(400).json({ error: 'La cantidad debe ser un número entero positivo.' });
  }

  // Asignamos el valor ya parseado para que el servicio lo reciba correctamente
  req.body.cantidad = parsedCantidad;

  // sector
  if (!sector || !SECTORES_CON_PRECIOS[sector]) {
    return res.status(400).json({ error: `Sector inválido: ${sector}` });
  }

  next(); // Todo OK, pasa al controller
}
