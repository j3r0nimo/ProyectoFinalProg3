// middleware/validateClienteInput.js

// Valida todos los campos. Middleware para validar la creación de un cliente

export function validateClienteInput(req, res, next) {
  const { nombre, dni, tarjetaNro, tarjetaMA, codigoPostal } = req.body;

  // Trim all string inputs
  req.body.nombre = nombre?.trim();
  req.body.dni = dni?.trim();
  req.body.tarjetaNro = tarjetaNro?.trim();
  req.body.tarjetaMA = tarjetaMA?.trim();
  req.body.codigoPostal = codigoPostal?.trim();

  // Nombre
  if (!req.body.nombre) {
    return res.status(400).json({ error: 'El campo nombre es obligatorio' });
  }

  // DNI
  if (!req.body.dni) {
    return res.status(400).json({ error: 'El campo DNI es obligatorio' });
  }
  if (!/^\d{7,8}$/.test(req.body.dni)) {
    return res.status(400).json({ error: 'El DNI debe tener 7 u 8 dígitos numéricos' });
  }

  // Tarjeta número
  if (!req.body.tarjetaNro) {
    return res.status(400).json({ error: 'El número de tarjeta es obligatorio' });
  }
  if (!/^\d{16}$/.test(req.body.tarjetaNro)) {
    return res.status(400).json({ error: 'El número de tarjeta debe tener 16 dígitos' });
  }

  // Tarjeta fecha MM/YY
  if (!req.body.tarjetaMA) {
    return res.status(400).json({ error: 'La fecha de vencimiento de la tarjeta es obligatoria' });
  }
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(req.body.tarjetaMA)) {
    return res.status(400).json({ error: 'Formato de vencimiento inválido (MM/YY)' });
  }

  // Verificar que no esté vencida
  const [mesStr, anioStr] = req.body.tarjetaMA.split('/');
  const mes = parseInt(mesStr, 10);
  const anio = 2000 + parseInt(anioStr, 10);
  const ahora = new Date();
  const finMesTarjeta = new Date(anio, mes, 0, 23, 59, 59);
  if (finMesTarjeta < ahora) {
    return res.status(400).json({ error: 'La tarjeta ya está vencida' });
  }

  // Código postal
  if (!req.body.codigoPostal) {
    return res.status(400).json({ error: 'El código postal es obligatorio' });
  }
  if (req.body.codigoPostal.length < 4) {
    return res.status(400).json({ error: 'El código postal debe tener al menos 4 caracteres' });
  }

  next(); // Pasar al controlador si todo está ok
}
