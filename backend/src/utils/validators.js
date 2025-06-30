// utils/validators.js

/** INICIO COMENTARIO
 * Valida que el formato de MM/AA sea correcto y que la tarjeta no esté vencida.
 * @param {string} value - Fecha en formato MM/AA (por ejemplo, "07/25")
 * @throws {Error} Si la fecha es inválida o ya ha vencido
 * FIN COMENTARIO
 */
export function validateTarjetaNoVencida(value) {
  // Validar formato MM/AA
  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(value)) {
    throw new Error("El formato de vencimiento debe ser MM/AA");
  }

  // Validar que no esté vencida
  const [mm, yy] = value.split('/').map(Number);
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
    throw new Error("La tarjeta está vencida");
  }
}