import { normalizeString } from './utils/normalize.js';
import municipalities from './data/Municipios.json'


const _municipalitiesByCode = new Map();
const _municipalitiesByprovince = new Map();
const _municipalitiesByName = new Map();
const _municipalitiesListForSearch: Municipalities[] = [];

for(const A of municipalities){
  const normalizedName = normalizeString(A.Name);
  const MuniData: Municipalities = { ...A };

  Object.defineProperty(MuniData, '_searchName', {
    value: normalizedName,
    enumerable: false,  
    writable: false, 
    configurable: false 
  });

  _municipalitiesByCode.set(A.Code, MuniData);
  _municipalitiesByName.set(normalizedName, MuniData);
  _municipalitiesListForSearch.push(MuniData);

  if (!_municipalitiesByprovince.has(A.Province)) {
    _municipalitiesByprovince.set(A.Province, []);
  }
  _municipalitiesByprovince.get(A.Province)!.push(MuniData);
}

export interface Municipalities {
  Code: string;
  Name: string;
  Province: string;
}

/**
 * Lista de Municipios
 * @returns {Array<Municipalities>}
*/
function municipalitiesAll(): Array<Municipalities> {
 	return municipalities;
}

/**
 * Filtra Municipios por Codigo
 * @param {string} code - Codigo de la Municipios
 * @returns {Array<Municipalities>}
*/
function municipalitiesByCode(code: string=""): Municipalities | undefined {
  if (!code) return undefined;
  return _municipalitiesByCode.get(code.trim());
}

/**
 * Filtra Municipios por Nombre
 * @param {string} name - Nombre de la Municipios
 * @returns {Array<Municipalities>}
*/
function municipalitiesByName(name: string = ""): Municipalities[] | undefined {
  if (!name) return undefined;
  const search = normalizeString(name);
  return _municipalitiesByName.get(search)
}

/**
 * Filtra Municipios cuyo nombre contenga una parte del texto (case-insensitive)
 * @param {string} name - Parte del nombre del Municipios
 * @returns {Array<Municipalities>}
 */
function municipalitiesByNameLike(name:string = ""): Municipalities[]  {
  if (!name) return [];
  const search = normalizeString(name);
  return _municipalitiesListForSearch.filter(A => (A as any)?._searchName.includes(search));
}

/**
 * Filtra Municipios por Codigo de Provincia
 * @param {string} provinceCode - Codigo de la Provincia
 * @returns {Array<Municipalities>}
 */
function municipalitiesByProvince(provinceCode: string=""): Municipalities[] {
  if (!provinceCode) return [];
  return _municipalitiesByprovince.get(provinceCode.trim());
}

/**
 * Filtra excluir Municipios por Codigo
 * @param {string} Code - Codigo del Municipio
 * @returns {Array<Municipalities>}
 */
function excludeMunicipalitiesByCode(codes: string | string[]): Municipalities[] {
  const excludeSet = new Set(Array.isArray(codes) ? codes : [codes]);
  return _municipalitiesListForSearch.filter((A: Municipalities) => !excludeSet.has(A.Code));
}

/**
 * Filtra excluir Municipios por Codigo de Provincia
 * @param {string} provinceCode - Codigo de la Provincia
 * @returns {Array<Municipalities>}
 */
function excludeMunicipalitiesByProvince(provinceCode: string | string[]): Municipalities[] {
  const excludeSet = new Set(Array.isArray(provinceCode) ? provinceCode : [provinceCode]);
  return _municipalitiesListForSearch.filter((A: Municipalities) => !excludeSet.has(A.Province));
}

export { municipalitiesAll, municipalitiesByCode, municipalitiesByName, municipalitiesByNameLike,
excludeMunicipalitiesByCode, excludeMunicipalitiesByProvince, municipalitiesByProvince }