// test.ts
import { expect, assert } from 'chai';
import { describe, it } from "mocha";
import { provinceAll, provinceByCode, provinceByName, provinceByNameLike, excludeProvinceByCode, municipalitiesAll, municipalitiesByCode, municipalitiesByName, municipalitiesByNameLike, excludeMunicipalitiesByCode, excludeMunicipalitiesByProvince, municipalitiesByProvince } from "../dist/geo-rd.cjs";

describe('Province', () => {
	it("debería retornar la provincia por código", async () => {
		const expectedResult = { Code: '250000', Name: 'Santiago' }
		const result =  provinceByCode("250000")
		expect(result).to.deep.equal(expectedResult);
	})

	it("debería retornar la provincia por nombre", async () => {
		const expectedResult = { Code: '250000', Name: 'Santiago' }
		const result =  provinceByName("Santiago")
		expect(result).to.deep.equal(expectedResult);
	})

	it("debería retornar la provincia por nombre similar", async () => {
		const expectedResult = [
			{ Code: '140000', Name: 'María Trinidad Sánchez' },
			{ Code: '210000', Name: 'San Cristóbal' },
			{ Code: '220000', Name: 'San Juan' },
			{ Code: '230000', Name: 'San Pedro de Macorís' },
			{ Code: '240000', Name: 'Sánchez Ramírez' },
			{ Code: '250000', Name: 'Santiago' },
			{ Code: '260000', Name: 'Santiago Rodríguez' },
			{ Code: '310000', Name: 'San José de Ocoa' },
      { "Code": "320000",  "Name": "Santo Domingo" }
		]
		const result =  provinceByNameLike("San")
		expect(result).to.deep.equal(expectedResult);
	})

	it("debería excluir la provincia por código", async () => {
		const expectedResult = provinceAll().filter(province => province.Code !== "250000")
		const result =  excludeProvinceByCode("250000")
		expect(result).to.deep.equal(expectedResult);
	})
})

describe('Municipalities', () => {
	it("debería retornar el municipio por código", async () => {
		const expectedResult = { Code: '250100', Name: 'Santiago', Province: '250000' }
		const result = municipalitiesByCode("250100")
		expect(result).to.deep.equal(expectedResult);
	})

	it("debería retornar el municipio por nombre", async () => {
		const expectedResult = { Code: '250100', Name: 'Santiago', Province: '250000' }
		const result =  municipalitiesByName("Santiago")
		expect(result).to.deep.equal(expectedResult);
	})

	it("debería retornar el municipio por código de provincia", async () => {
		const expectedResult = municipalitiesAll().filter(municipality => municipality.Province === "250000")
		const result = municipalitiesByProvince("250000")
		expect(result).to.deep.equal(expectedResult);

	})
})