# geo-rd
Librería ligera para trabajar con las divisiones geográficas de la República Dominicana (provincias y municipios) a partir de JSON.

> **NOTA:** a partir de la version **2.0.0**, el paquete migra internamente al uso del objeto nativo Map de JavaScript y cadenas pre-normalizadas. Esto transforma todas las consultas relacionales y búsquedas por códigos en operaciones instantáneas de complejidad O(1), eliminando por completo el uso de bucles lineales (.find/.filter) en memoria y reduciendo a nanosegundos el tiempo de respuesta en entornos de alta concurrencia.

**soporte** de carga modular bajo demanda. Si tu aplicación solo necesita trabajar con Provincias, ya no estás obligado a cargar en la memoria RAM del servidor los pesados datos de Municipios o Distritos Municipales.

## Qué es
`geo-rd` expone funciones simples para consultar provincias y municipios por código o nombre, hacer búsquedas por fragmento ("like"), y filtrar/excluir por códigos. Está pensada para usarse tanto en proyectos JavaScript (CommonJS / ESM) como en TypeScript.

## Instalación

Como es un paquete local en este repositorio, instala las dependencias de desarrollo y construye cuando quieras probar:

```bash
npm i geo-rd
```

## Uso rápido (CommonJS)

```javascript
const geo = require('geo-rd') 

// Listar todas las provincias
console.log(geo.provinceAll());

// Buscar provincia por código
console.log(geo.provinceByCode('250000'));

// Buscar municipios de una provincia
console.log(geo.municipalitiesByProvince('250000'));
```

## Uso (ESM / TypeScript)

```ts
import { provinceAll, provinceByCode, municipalitiesByNameLike, municipalitiesByProvince } from './dist/geo-rd.js';

const provincias = provinceAll();
const santiago = provinceByCode('250000');
const municipiosSantiago = municipalitiesByProvince('250000');

console.log(santiago, municipiosSantiago);
```

Si usas TypeScript, los tipos ya exportados (`Province`, `Municipalities`) te ayudarán con autocompletado.

## API (funciones exportadas)

Resumen de las funciones principales que exporta `dist/geo-rd.js`:

- provinceAll(): Array<Province>
	- Retorna todas las provincias cargadas desde `data/Provincias.json`.

- provinceByCode(code: string): Province | undefined
	- Busca una provincia por su código exacto. Devuelve `undefined` si code es vacío o no hay coincidencia.

- provinceByName(name: string): Province | undefined
	- Busca una provincia cuyo nombre coincida exactamente (case-insensitive) con `name`.

- provinceByNameLike(name: string): Array<Province>
	- Busca todas las provincias cuyo nombre contenga la subcadena `name` (case-insensitive).

- excludeProvinceByCode(codes: string | string[]): Province[]
	- Devuelve la lista de provincias excluyendo las que coincidan con los códigos proporcionados.

- municipalitiesAll(): Array<Municipalities>
	- Retorna todos los municipios desde `data/Municipios.json`.

- municipalitiesByCode(code: string): Municipalities | undefined
	- Busca un municipio por código exacto.

- municipalitiesByName(name: string): Municipalities | undefined
	- Busca un municipio por nombre exacto (case-insensitive).

- municipalitiesByNameLike(name: string): Municipalities[]
	- Busca municipios cuyo nombre contenga la subcadena dada.

- excludeMunicipalitiesByCode(codes: string | string[]): Municipalities[]
	- Excluye municipios por código.

- excludeMunicipalitiesByProvince(codes: string | string[]): Municipalities[]
	- Excluye municipios que pertenezcan a las provincias indicadas.

- municipalitiesByProvince(codes: string | string[]): Municipalities[]
	- Devuelve los municipios que pertenecen a las provincias indicadas.


### Tipos exportados

- Province
	- Shape: { Code: string; Name: string }

- Municipalities
	- Shape: { Code: string; Name: string; Province: string }

## Ejemplos concretos

Suponiendo que `Provincias.json` contiene la provincia con código `250000` y nombre `Santiago`, y `Municipios.json` incluye municipios con `Province: "250000"`:

- Buscar provincia por código

```js
const province = provinceByCode('250000');
// province -> { Code: '250000', Name: 'Santiago' }
```

- Buscar municipios de la provincia `250000`

```js
const ms = municipalitiesByProvince('250000');
// ms -> [ { Code: '250001', Name: 'Santiago de los Caballeros', Province: '250000' }, ... ]
```

- Búsqueda por fragmento (case-insensitive)

```js
municipalitiesByNameLike('santiago');
// -> devuelve municipios cuyo nombre contiene 'santiago'
```

**API - Distritos**

- **`districtsAll()`**: Array<District>
	- Retorna todos los distritos cargados desde `data/Distritos.json`.

- **`districtsByCode(code: string)`**: District | undefined
	- Busca un distrito por su código exacto. Devuelve `undefined` si no hay coincidencia.

- **`districtsByName(name: string)`**: District | undefined
	- Busca un distrito cuyo nombre coincida exactamente (case-insensitive) con `name`.

- **`districtsByNameLike(name: string)`**: Array<District>
	- Busca todos los distritos cuyo nombre contenga la subcadena `name` (case-insensitive).

- **`districtsByProvince(code: string | string[])`**: Array<District>
	- Devuelve los distritos que pertenecen a las provincias indicadas (por código o array de códigos).

- **`districtsByMunicipality(code: string | string[])`**: Array<District>
	- Devuelve los distritos que pertenecen a los municipios indicados (por código o array de códigos).

- **`excludeDistrictByCode(codes: string | string[])`**: Array<District>
	- Excluye distritos por código y retorna el resto.

- **`excludeDistrictByMunicipality(codes: string | string[])`**: Array<District>
	- Excluye distritos que pertenecen a los municipios indicados.

- **`excludeDistrictByProvince(codes: string | string[])`**: Array<District>
	- Excluye distritos que pertenecen a las provincias indicadas.

**Tipo `District`**

- Shape: `{ Code: string; Name: string; MunicipalityCode: string; ProvinceCode: string }`

**Ejemplos (CommonJS)**

```js
const { districtsAll, districtsByMunicipality, districtsByNameLike } = require('geo-rd');

console.log(districtsAll());
console.log(districtsByMunicipality('080100'));
console.log(districtsByNameLike('Centro'));
```
### 📦 Métodos de Importación

#### 1. Importación Global (Clásica)
Carga toda la base de datos geográfica de la República Dominicana en memoria. Es la opción más cómoda para aplicaciones monolíticas o backends tradicionales.

```javascript
// Carga automática de Provincias, Municipios y Distritos
import { getProvinciaByCode, getMunicipiosByProvince } from 'geo-rd';
```

#### 2. Importación Segmentada (Máximo Rendimiento)
Carga de forma aislada únicamente el módulo que vas a utilizar, consumiendo hasta un **80% menos de memoria RAM** en ejecuciones aisladas.

```javascript
// 🔹 Carga SOLO Provincias (El módulo más liviano)
import { getProvinciaByCode, searchProvincias } from 'geo-rd/provincias';

// 🔹 Carga SOLO Municipios
import { getMunicipioByCode, getMunicipiosByProvince } from 'geo-rd/municipios';

// 🔹 Carga SOLO Distritos Municipales (El módulo de mayor peso)
import { getDistrictsByMunicipality } from 'geo-rd/distritos';
```

---

### 📊 Comparativa de Consumo en Memoria


| Método de Importación | Datos Cargados en RAM | Impacto en Rendimiento | Ideal para... |
| :--- | :--- | :--- | :--- |
| `import {} from 'geo-rd'` | Provincias + Municipios + Distritos | Base completa indexada | APIs Robustas, Scripts de migración masiva. |
| `import {} from 'geo-rd/provincias'` | **Solo Provincias** | Ultra-liviano / Instantáneo | Formularios de registro, Selects básicos de ubicación. |


## Notas y buenas prácticas

- Normalización: las funciones que aceptan `code` o `name` ya hacen `trim()` y comparaciones case-insensitive cuando aplica, pero asegúrate de pasar `string` válidos.


## Contribuir

Si quieres añadir el dataset completo (más municipios y distritos) o nuevas funciones (p. ej. relaciones jerárquicas hasta nivel de distrito), abre un issue o PR con el formato de datos propuesto. Incluye tests que verifiquen las nuevas funciones.

## Licencia

MIT

## Fuentes

Oficina Nacional de Estadística (**[ONE](https://www.one.gob.do)**), Departamento de Cartografía. División de Límites y Linderos.
Actualizada al 30 de junio del 2014