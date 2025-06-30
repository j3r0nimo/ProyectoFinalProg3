// middleware/validateClienteUpdate.js

// específicamente para solicitudes PUT (actualización) y que permite actualizaciones parciales, 
// valida solo los campos presentes, en lugar de requerir todos los campos, como lo hace el middleware POST. 

export function validateClienteUpdate(req, res, next) {
  const { nombre, dni, tarjetaNro, tarjetaMA, codigoPostal } = req.body;

  // Trim string, solamente si existen
  if (nombre !== undefined) req.body.nombre = nombre.trim();
  if (dni !== undefined) req.body.dni = dni.trim();
  if (tarjetaNro !== undefined) req.body.tarjetaNro = tarjetaNro.trim();
  if (tarjetaMA !== undefined) req.body.tarjetaMA = tarjetaMA.trim();
  if (codigoPostal !== undefined) req.body.codigoPostal = codigoPostal.trim();

  // Validar solo los campos presentes

  if (nombre !== undefined && req.body.nombre.length === 0) {
    return res.status(400).json({ error: 'El campo nombre no puede estar vacío' });
  }

  if (dni !== undefined) {
    if (!/^\d{7,8}$/.test(req.body.dni)) {
      return res.status(400).json({ error: 'El DNI debe tener 7 u 8 dígitos numéricos' });
    }
  }

  if (tarjetaNro !== undefined) {
    if (!/^\d{16}$/.test(req.body.tarjetaNro)) {
      return res.status(400).json({ error: 'El número de tarjeta debe tener 16 dígitos' });
    }
  }

  if (tarjetaMA !== undefined) {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(req.body.tarjetaMA)) {
      return res.status(400).json({ error: 'Formato de vencimiento inválido (MM/YY)' });
    }

    const [mesStr, anioStr] = req.body.tarjetaMA.split('/');
    const mes = parseInt(mesStr, 10);
    const anio = 2000 + parseInt(anioStr, 10);
    const ahora = new Date();
    const finMesTarjeta = new Date(anio, mes, 0, 23, 59, 59);

    if (finMesTarjeta < ahora) {
      return res.status(400).json({ error: 'La tarjeta ya está vencida' });
    }
  }

  if (codigoPostal !== undefined) {
    if (req.body.codigoPostal.length < 4) {
      return res.status(400).json({ error: 'El código postal debe tener al menos 4 caracteres' });
    }
  }

  next();
}
