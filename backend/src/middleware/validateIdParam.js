// middleware/validateIdParam.js

// Validación del id, especialmente porque puede reutilizarse en múltiples rutas.

export function validateIdParam(req, res, next) {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res
      .status(400)
      .json({ error: 'ID inválido. Debe ser un número entero positivo.' });
  }

  next();
}
