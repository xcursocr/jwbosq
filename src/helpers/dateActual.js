/**
 *Función para obtener la fecha en formato YYYY-MM-DD
 * @returns
 */
export const obtenerFechaActual = () => {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
  const dia = String(fecha.getDate()).padStart(2, "0");

  return `${año}-${mes}-${dia}`; // Formato YYYY-MM-DD
};
