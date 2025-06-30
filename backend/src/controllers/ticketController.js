import * as ticketService from '../services/ticketService.js';

export const getDisponibilidadPorSector = async (req, res) => {
  try {
    const disponibilidad = await ticketService.getDisponibilidadPorSector();
    res.json(disponibilidad);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener disponibilidad', detalle: err.message });
  }
};

export const getTicketsPorCliente = async (req, res) => {
  try {
    const tickets = await ticketService.getTicketsPorCliente(req.params.id);

    if (!tickets.length) {
      return res.status(404).json({ error: 'No se encontraron tickets para este cliente' });
    }

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tickets', detalle: err.message });
  }
};
