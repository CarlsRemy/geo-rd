import { normalizeString } from './utils/normalize';
import districts from './data/Distrito.json'

export interface District {
  Code: string;
  Name: string;
  Province: string;
  Municipality: string;
}
const _districtsByCode = new Map();
const _districtsByMunicipality = new Map();
const _districtsByProvince = new Map();
const _districtsByName = new Map();
const _districtsListForSearch: District[] = [];

for(const A of districts){
  const normalizedName = normalizeString(A.Name);
  const MuniData: District = { ...A };

  Object.defineProperty(MuniData, '_searchName', {
    value: normalizedName,
    enumerable: false,  
    writable: false, 
    configurable: false 
  });

  _districtsByCode.set(A.Code, MuniData);
  _districtsByName.set(normalizedName, MuniData);
  _districtsListForSearch.push(MuniData);

  if (!_districtsByProvince.has(A.Province)) {
    _districtsByProvince.set(A.Province, []);
  }
  _districtsByProvince.get(A.Province)!.push(MuniData);

  if (!_districtsByMunicipality.has(A.Municipality)) {
    _districtsByMunicipality.set(A.Municipality, []);
  }

  _districtsByMunicipality.get(A.Municipality)!.push(MuniData);
}

/**
 * Lista de Distritos
 * @returns {Array<District>}
*/
function districtsAll(): Array<District> {
 	return districts;
}

/**
 * Filtra Distritos por Codigo
 * @param {string} code - Codigo de la Distritos
 * @returns {Array<District>}
*/
function districtsByCode(code: string=""): District | undefined {
  if (!code) return undefined;
  return _districtsByCode.get(code.trim());
}

/**
 * Filtra Distritos por Nombre
 * @param {string} name - Nombre de la Distritos
 * @returns {Array<District>}
*/
function districtsByName(name: string = ""): District[] | undefined {
  if (!name) return undefined;
  const search = normalizeString(name);
  return _districtsByName.get(search);
}

/**
 * Filtra Distritos cuyo nombre contenga una parte del texto (case-insensitive)
 * @param {string} name - Parte del nombre del Distritos
 * @returns {Array<District>}
 */
function districtsByNameLike(name:string = ""): District[]  {
  if (!name) return [];
  const search = normalizeString(name);
  return _districtsListForSearch.filter(A => (A as any)?._searchName.includes(search));
}

/**
 * Filtra Distritos por Codigo de Provincia
 * @param {string} provinceCode - Codigo de la Provincia
 * @returns {Array<District>}
 */
function districtsByProvince(provinceCode: string=""): District[] {
  if (!provinceCode) return [];
  return _districtsByProvince.get(provinceCode.trim());
}

/**
 * Filtra Distritos por Codigo de Municipio
 * @param {string} municipalityCode - Codigo del Municipio
 * @returns {Array<District>}
 */
function districtsByMunicipality(municipalityCode: string=""): District[] {
  if (!municipalityCode) return [];
  return _districtsByMunicipality.get(municipalityCode.trim())
}

function excludeDistrictByCode(codes: string | string[]): District[] {
  const excludeSet = new Set(Array.isArray(codes) ? codes : [codes]);
  return _districtsListForSearch.filter((A: District) => !excludeSet.has(A.Code));
}

/**
 * Filtra excluir Distritos por Codigo de Municipio
 * @param {string| string[]} municipalityCode - Codigo del Municipio
 * @returns {Array<District>}
 */
function excludeDistrictByMunicipality(municipalityCode: string | string[]): District[] {
  const excludeSet = new Set(Array.isArray(municipalityCode) ? municipalityCode : [municipalityCode]);
  return _districtsListForSearch.filter((A: District) => !excludeSet.has(A.Municipality));
}

/**
 * Filtra excluir Distritos por Codigo de Provincia
 * @param {string| string[]} provinceCode - Codigo de la Provincia
 * @returns {Array<District>}
 */
function excludeDistrictByProvince(provinceCode: string | string[]): District[] {
  const excludeSet = new Set(Array.isArray(provinceCode) ? provinceCode : [provinceCode]);
  return _districtsListForSearch.filter((A:District) => !excludeSet.has(A.Province));
}

export {districtsAll, districtsByCode, districtsByName, districtsByNameLike, districtsByProvince,
districtsByMunicipality, excludeDistrictByCode, excludeDistrictByMunicipality,
excludeDistrictByProvince}