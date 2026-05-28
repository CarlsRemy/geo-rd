import provinces from './data/Provincias.json'
import { normalizeString } from './utils/normalize.js';

export interface Province {
  Code: string;
  Name: string;
}

const _provinciasByCode = new Map();
const _provinciasByName = new Map();
const _provinciasListForSearch: Province[] = [];


for (const prov of provinces) {
  const normalizedName = normalizeString(prov.Name);
  const provData: Province = { ...prov };

  Object.defineProperty(provData, '_searchName', {
    value: normalizedName,
    enumerable: false,  // ❌ Hace que no sea visible en logs, JSON.stringify o bucles
    writable: false,    // 🔒 Protege la propiedad para que no sea modificada
    configurable: false // 🔒 Evita que sea eliminada o reconfigurada
  });

  _provinciasByCode.set(prov.Code, provData);
  _provinciasByName.set(normalizedName, provData);
  _provinciasListForSearch.push(provData);
} 


/**
 * Lista de provincias
 * @returns {Array<Province>}
*/
function provinceAll(): Array<Province> {
 	return provinces;
}

/**
 * Filtra provincias por Codigo
 * @param {string} code - Codigo de la provincia
 * @returns {Array<Object>}
*/
function provinceByCode(code: string=""): Province | undefined {
  if (!code) return undefined;
	return _provinciasByCode.get(code.trim());
}

/**
 * Filtra provincias por Nombre
 * @param {string} name - Nombre de la provincia
 * @returns {Array<Province>}
*/
function provinceByName(name: string = ""): Province[] | undefined {
  if (!name) return undefined;
  const search = normalizeString(name);
  return _provinciasByName.get(search);
}

/**
 * Filtra provincias cuyo nombre contenga una parte del texto (case-insensitive)
 * @param {string} name - Parte del nombre de la provincia
 * @returns {Array<Object>}
 */
function provinceByNameLike(name:string = ""): Array<Province>  {
  if (!name) return [];
  const search = normalizeString(name);
  return _provinciasListForSearch.filter(A => (A as any)?._searchName.includes(search));
}

function excludeProvinceByCode(codes: string | string[]): Province[] {
  const excludeSet = new Set(Array.isArray(codes) ? codes : [codes]);
  return _provinciasListForSearch.filter((A: Province) => !excludeSet.has(A.Code));
}

export { provinceAll, provinceByCode, provinceByName, provinceByNameLike, excludeProvinceByCode};