// Prepara una foto para el menú: la recorta a 4:3, la reduce a 1000×750 y la
// guarda como WebP liviano en src/assets/platos/.
//
// Uso:  npm run foto -- "/ruta/a/la/foto.png" nombre-del-plato
// Ej.:  npm run foto -- "~/Desktop/Img rancho27/arepa mixta.png" arepa-mixta
//       → crea src/assets/platos/arepa-mixta.webp

import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { createRequire } from "node:module";

// sharp viene incluido con Next.js (lo usa para optimizar imágenes).
const require = createRequire(import.meta.url);
const sharp = require(require.resolve("sharp", { paths: [require.resolve("next")] }));

const [input, name] = process.argv.slice(2);
if (!input || !name || !/^[a-z0-9-]+$/.test(name)) {
  console.error('Uso: npm run foto -- "/ruta/a/la/foto.png" nombre-del-plato');
  console.error("El nombre va en minúsculas, sin tildes ni espacios (usa guiones): arepa-mixta");
  process.exit(1);
}

const source = input.replace(/^~(?=\/)/, homedir());
if (!existsSync(source)) {
  console.error(`No encuentro la foto: ${source}`);
  process.exit(1);
}

const output = `src/assets/platos/${name}.webp`;
const info = await sharp(source)
  .rotate() // respeta la orientación de las fotos del celular
  .resize({ width: 1000, height: 750, fit: "cover" })
  .webp({ quality: 80, effort: 6 })
  .toFile(output);

console.log(`✔ ${output} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
console.log(`Ahora impórtala en src/data/menu.ts:  import ${toCamel(name)} from "@/assets/platos/${name}.webp";`);

function toCamel(text) {
  return text.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}
