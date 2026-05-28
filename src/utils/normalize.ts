/**
 * Normaliza una cadena de texto eliminando acentos, caracteres especiales y convirtiendo a minúsculas.
 * Esto facilita la comparación de cadenas de texto de manera más flexible, especialmente para búsquedas.
 * @param {string} str - La cadena de texto a normalizar.
 * @returns {string} - La cadena normalizada.
 */

function normalizeString(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') 
    .replace(/[^a-z0-9 ]/g, '').trim();
}


export { normalizeString }