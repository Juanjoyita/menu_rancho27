# Rancho 27 — Menú digital

Menú QR del restaurante Rancho 27 (Chachagüí, Nariño). Hecho con Next.js 16, TypeScript y Tailwind v4. Publicado en Netlify: cada cambio que se sube a GitHub (`main`) se publica solo en ~1 minuto.

- **Página de bienvenida:** `/es` y `/en` (logo, "Ver menú", WhatsApp y redes).
- **Menú:** `/es/menu` y `/en/menu`.
- **`/`** redirige a `/es` o `/en` según el idioma del celular (a donde apunta el QR).

## Dónde está cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Platos, precios, descripciones, agotados, fotos del menú | `src/data/menu.ts` |
| Números de WhatsApp, redes sociales, descripción del restaurante | `src/config/site.ts` |
| Textos fijos de la interfaz ("Ver menú", "Agotado"…) | `src/i18n/dictionaries.ts` |
| Fotos de los platos | carpeta `src/assets/platos/` |
| Logo | `public/images/logo.webp` (y los íconos `src/app/favicon.ico`, `icon.png`, `apple-icon.png`) |

Todos los textos van en español (`es`) e inglés (`en`). Si falta el inglés, se muestra el español.

## Antes de empezar (una vez por sesión)

```bash
cd ~/Desktop/Proyecto-menu-rancho27/rancho27-menu
nvm use        # activa Node 24 (lo lee de .nvmrc)
npm run dev    # ver la web en http://localhost:3000 mientras editas
```

## Cambios frecuentes (todos en `src/data/menu.ts`)

### Cambiar un precio
Busca el plato (`Cmd+F`) y cambia `price`. Va en pesos, **sin puntos ni signo**:

```ts
name: { es: "Almuerzo al horno", en: "Oven-baked lunch" },
price: 32000,   // → se muestra "$32.000"
```

Las tarjetas con foto de un plato toman el precio del plato: se cambia en un solo lugar.

### Marcar un plato como agotado (y quitar el agotado)
Añade `available: false` al plato. Se verá tachado con la etiqueta "Agotado". Para volver a ofrecerlo, borra esa línea.

```ts
{
  name: { es: "Gallina", en: "Hen" },
  price: 27000,
  available: false,
},
```

### Marcar un plato como recomendado
Añade `featured: true` (nombre en negrita y "★ Recomendado"). Bórralo para quitarlo.

### Agregar un plato
Copia un plato parecido de la misma sección y cambia los datos. **El orden en el archivo es el orden en el menú.**

```ts
{
  name: { es: "Arepa de choclo con chicharrón", en: "Sweet corn arepa with pork crackling" },
  description: { es: "Con queso campesino.", en: "With farmer's cheese." }, // opcional
  price: 9000,
},
```

Para **quitar** un plato, borra su bloque `{ ... },` completo.

### Agregar o cambiar una foto
1. Prepara la foto (la recorta a 4:3 y la deja liviana):
   ```bash
   npm run foto -- "~/Desktop/Img rancho27/arepa mixta.png" arepa-mixta
   ```
   El nombre va en minúsculas, sin tildes ni espacios. Crea `src/assets/platos/arepa-mixta.webp`.
2. Impórtala al inicio de `src/data/menu.ts`, junto a las demás:
   ```ts
   import arepaMixta from "@/assets/platos/arepa-mixta.webp";
   ```
3. Úsala en una tarjeta:
   - **Debajo de un plato** (proteínas, huevos…), dentro de `options` del plato:
     ```ts
     options: [
       { name: { es: "Chorizo", en: "Chorizo" }, side: { es: "Con papa frita", en: "With French fries" }, image: almuerzoChorizo },
     ],
     ```
     Con 2 o más opciones aparece el título "Elige tu proteína"; cámbialo con `choiceTitle: { es: "...", en: "..." }`.
   - **Arriba de una sección** (como las arepas), dentro de `gallery` de la sección.

Para **reemplazar** una foto existente, ejecuta el paso 1 con el **mismo nombre** del archivo actual: se sobrescribe y no hay que tocar el código.

> ⚠️ No renombres ni muevas archivos dentro de `src/assets/platos/` a mano: el código los busca por su nombre exacto. Si falta uno, `npm run build` falla con `Module not found` y dice cuál.

## Cambiar WhatsApp o redes (`src/config/site.ts`)

```ts
numbers: ["573225935689", "573234830770"],  // 57 + celular, sin "+" ni espacios
```

Puedes añadir o quitar números de la lista; el botón "Reserva ya" se adapta solo.

## Publicar un cambio

1. **Comprueba que todo está bien** (si algo falla, lee el error: dice archivo y línea):
   ```bash
   npm run lint
   npm run build
   ```
2. **Guarda y sube el cambio:**
   ```bash
   git add -A
   git commit -m "precio: almuerzo al horno a 32.000"
   git push
   ```
   (O en Cursor: **Source Control** → escribe el mensaje → **Commit** → **Sync Changes**.)
3. En ~1 minuto Netlify publica solo. Revisa en el celular (recarga la página).

Si el despliegue falla, la web anterior sigue funcionando: revisa el error en Netlify (**Deploys**), corrígelo y vuelve a subir.

## Seguridad y mantenimiento

- No subas contraseñas ni tokens: los archivos `.env*` están excluidos de Git.
- Las imágenes solo pueden ser locales (no se permiten de otros sitios).
- Cabeceras de seguridad configuradas en `next.config.ts`.
- Cada pocos meses actualiza Next.js dentro de la misma versión mayor y revisa con `npm audit --omit=dev` (debe dar 0 vulnerabilidades):
  ```bash
  npm install --save-exact next@16 && npm install --save-dev --save-exact eslint-config-next@16
  npm run lint && npm run build
  ```
