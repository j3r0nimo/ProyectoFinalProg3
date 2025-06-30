// services/ticketService.js
import Ticket from '../models/ticket.js';
import { LIMITE_POR_SECTOR, SECTORES_CON_PRECIOS } from '../constants/ticketConfig.js';

export async function getDisponibilidadPorSector() {
  const disponibilidad = {};

  for (const sector in SECTORES_CON_PRECIOS) {
    const vendidos = await Ticket.count({ where: { sector } });
    const disponibles = LIMITE_POR_SECTOR - vendidos;

    disponibilidad[sector] = {
      disponibles,
      precio: SECTORES_CON_PRECIOS[sector],
      agotado: disponibles <= 0
    };
  }

  return disponibilidad;
}

export async function getTicketsPorCliente(clienteId) {
  return await Ticket.findAll({ where: { clienteId } });
}
