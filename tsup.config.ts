import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [   'src/geo-rd.ts',
    'src/provincias.ts',
    'src/municipios.ts',
    'src/distritos.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
	minify: true,           // Minifica el código
  outDir: 'dist',
	outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  }
})