import provinces from './data/Provincias.json'
import municipalities from './data/Municipios.json'
import districts from './data/Distrito.json'


export interface Province {
  Code: string;
  Name: string;
}

export interface Municipalities {
  Code: string;
  Name: string;
  Province: string;
}

export interface District {
  Code: string;
  Name: string;
  Province: string;
  Municipality: string;
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
	return provinces.find((A: Province) => A.Code === code.trim());
}

/**
 * Filtra provincias por Nombre
 * @param {string} name - Nombre de la provincia
 * @returns {Array<Province>}
*/
function provinceByName(name: string = ""): Province | undefined {
  if (!name) return undefined;
	return provinces.find((A: Province) => A.Name.toLowerCase() === name.toLowerCase().trim());
}

/**
 * Filtra provincias cuyo nombre contenga una parte del texto (case-insensitive)
 * @param {string} name - Parte del nombre de la provincia
 * @returns {Array<Object>}
 */
function provinceByNameLike(name:string = ""): Array<Province>  {
  if (!name) return [];
  const search = name.toLowerCase().trim();
  return provinces.filter((A: Province) => A.Name.toLowerCase().includes(search));
}

function excludeProvinceByCode(codes: string | string[]): Province[] {
  const list = Array.isArray(codes) ? codes : [codes];
  return provinces.filter((A: Province) => !list.includes(A.Code));
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
	return municipalities.find((A: Municipalities) => A.Code === code.trim());
}

/**
 * Filtra Municipios por Nombre
 * @param {string} name - Nombre de la Municipios
 * @returns {Array<Municipalities>}
*/
function municipalitiesByName(name: string = ""): Municipalities | undefined {
  if (!name) return undefined;
	return municipalities.find((A: Municipalities) => A.Name.toLowerCase() === name.toLowerCase().trim());
}

/**
 * Filtra Municipios cuyo nombre contenga una parte del texto (case-insensitive)
 * @param {string} name - Parte del nombre del Municipios
 * @returns {Array<Municipalities>}
 */
function municipalitiesByNameLike(name:string = ""): Municipalities[]  {
  if (!name) return [];
  const search = name.toLowerCase().trim();
  return municipalities.filter((A: Municipalities) => A.Name.toLowerCase().includes(search));
}

/**
 * Filtra Municipios por Codigo de Provincia
 * @param {string} provinceCode - Codigo de la Provincia
 * @returns {Array<Municipalities>}
 */
function municipalitiesByProvince(provinceCode: string=""): Municipalities[] {
  if (!provinceCode) return [];
  return municipalities.filter((A: Municipalities) => A.Province === provinceCode.trim());
}

/**
 * Filtra excluir Municipios por Codigo
 * @param {string} Code - Codigo del Municipio
 * @returns {Array<Municipalities>}
 */
function excludeMunicipalitiesByCode(codes: string | string[]): Municipalities[] {
  const list = Array.isArray(codes) ? codes : [codes];
  return municipalities.filter((A: Municipalities) => !list.includes(A.Code));
}

/**
 * Filtra excluir Municipios por Codigo de Provincia
 * @param {string} provinceCode - Codigo de la Provincia
 * @returns {Array<Municipalities>}
 */
function excludeMunicipalitiesByProvince(provinceCode: string | string[]): Municipalities[] {
  const list = Array.isArray(provinceCode) ? provinceCode : [provinceCode];
  return municipalities.filter((A: Municipalities) => !list.includes(A.Province));
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
	return districts.find((A: District) => A.Code === code.trim());
}

/**
 * Filtra Distritos por Nombre
 * @param {string} name - Nombre de la Distritos
 * @returns {Array<District>}
*/
function districtsByName(name: string = ""): District | undefined {
  if (!name) return undefined;
	return districts.find((A: District) => A.Name.toLowerCase() === name.toLowerCase().trim());
}

/**
 * Filtra Distritos cuyo nombre contenga una parte del texto (case-insensitive)
 * @param {string} name - Parte del nombre del Distritos
 * @returns {Array<District>}
 */
function districtsByNameLike(name:string = ""): District[]  {
  if (!name) return [];
  const search = name.toLowerCase().trim();
  return districts.filter((A: District) => A.Name.toLowerCase().includes(search));
}

/**
 * Filtra Distritos por Codigo de Provincia
 * @param {string} provinceCode - Codigo de la Provincia
 * @returns {Array<District>}
 */
function districtsByProvince(provinceCode: string=""): District[] {
  if (!provinceCode) return [];
  return districts.filter((A: District) => A.Province === provinceCode.trim());
}

/**
 * Filtra Distritos por Codigo de Municipio
 * @param {string} municipalityCode - Codigo del Municipio
 * @returns {Array<District>}
 */
function districtsByMunicipality(municipalityCode: string=""): District[] {
  if (!municipalityCode) return [];
  return districts.filter((A: District) => A.Municipality === municipalityCode.trim());
}

function excludeDistrictByCode(codes: string | string[]): District[] {
  const list = Array.isArray(codes) ? codes : [codes];
  return districts.filter((A: District) => !list.includes(A.Code));
}

/**
 * Filtra excluir Distritos por Codigo de Municipio
 * @param {string| string[]} municipalityCode - Codigo del Municipio
 * @returns {Array<District>}
 */
function excludeDistrictByMunicipality(municipalityCode: string | string[]): District[] {
  const list = Array.isArray(municipalityCode) ? municipalityCode : [municipalityCode];
  return districts.filter((A: District) => !list.includes(A.Municipality));
}

/**
 * Filtra excluir Distritos por Codigo de Provincia
 * @param {string| string[]} provinceCode - Codigo de la Provincia
 * @returns {Array<District>}
 */
function excludeDistrictByProvince(provinceCode: string | string[]): District[] {
  const list = Array.isArray(provinceCode) ? provinceCode : [provinceCode];
  return districts.filter((A: District) => !list.includes(A.Province));
}

export { provinceAll, provinceByCode, provinceByName, provinceByNameLike, excludeProvinceByCode,
municipalitiesAll, municipalitiesByCode, municipalitiesByName, municipalitiesByNameLike,
excludeMunicipalitiesByCode, excludeMunicipalitiesByProvince, municipalitiesByProvince,
districtsAll, districtsByCode, districtsByName, districtsByNameLike, districtsByProvince,
districtsByMunicipality, excludeDistrictByCode, excludeDistrictByMunicipality,
excludeDistrictByProvince};