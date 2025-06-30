import * as compraService from '../services/compraService.js';

export const realizarCompra = async (req, res) => {
  try {
    const resultado = await compraService.realizarCompra(req.body);

    res.status(201).json({
      mensaje: 'Compra realizada con éxito',
      ...resultado,
      ticketsComprados: resultado.tickets.length
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
