import provinces from './data/Provincias.json'
import municipalities from './data/Municipios.json'


export interface Province {
  Code: string;
  Name: string;
}

export interface Municipalities {
  Code: string;
  Name: string;
  Province: string;
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
function municipalitiesAll(): Array<Province> {
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
	return municipalities.find((A: Province) => A.Name.toLowerCase() === name.toLowerCase().trim());
}

/**
 * Filtra Municipios cuyo nombre contenga una parte del texto (case-insensitive)
 * @param {string} name - Parte del nombre del Municipios
 * @returns {Array<Municipalities>}
 */
function municipalitiesByNameLike(name:string = ""): Municipalities[]  {
  if (!name) return [];
  const search = name.toLowerCase().trim();
  return municipalities.filter((A: Province) => A.Name.toLowerCase().includes(search));
}

function excludeMunicipalitiesByCode(codes: string | string[]): Municipalities[] {
  const list = Array.isArray(codes) ? codes : [codes];
  return municipalities.filter((A: Province) => !list.includes(A.Code));
}


export { provinceAll, provinceByCode, provinceByName, provinceByNameLike, excludeProvinceByCode, municipalitiesAll, municipalitiesByCode, municipalitiesByName, municipalitiesByNameLike, excludeMunicipalitiesByCode};