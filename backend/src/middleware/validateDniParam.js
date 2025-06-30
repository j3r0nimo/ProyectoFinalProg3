// middleware/validateDniParam.js

export function validateDniParam(req, res, next) {
  const { dni } = req.params;

  if (!/^\d{7,8}$/.test(dni)) {
    return res.status(400).json({ error: 'Formato de DNI inválido. Debe tener 7 u 8 dígitos numéricos.' });
  }

  next();
}
