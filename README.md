# Imai — Sitio corporativo

Sitio web corporativo de **Imai**, empresa de desarrollo de software e
inteligencia artificial. El concepto de marca nace de la estrella
**Imai / Delta Crucis** y se expresa a través de una estética editorial,
astronómica y tecnológica: oscura, precisa, cinematográfica y humana.

> _Inspirados por las estrellas, construimos el futuro._

---

## Stack tecnológico

- **Next.js 14** (App Router) + **React 18**
- **TypeScript** (modo estricto)
- **Tailwind CSS**
- **Framer Motion** (animaciones)
- **lucide-react** (iconografía funcional)
- **next/font** (Inter · Instrument Serif · IBM Plex Mono)
- ESLint + Prettier (+ `prettier-plugin-tailwindcss`)

Sin librerías visuales pesadas ni dependencias innecesarias. Server
Components por defecto; Client Components solo donde se requiere
interactividad o animación.

---

## Requisitos

- Node.js **18.18+** (recomendado 20+)
- npm 9+

---

## Instalación y ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Entorno de desarrollo
npm run dev
#   → http://localhost:3000

# 3. Build de producción
npm run build
npm start

# 4. Verificaciones
npm run typecheck   # TypeScript
npm run lint        # ESLint
npm run format      # Prettier
```

> **Nota sobre fuentes:** las tipografías se cargan con `next/font/google` y se
> descargan y self-hostean automáticamente durante el _build_. El sitio funciona
> sin conexión a Internet una vez construido. Si el entorno de _build_ no tiene
> acceso a `fonts.gstatic.com`, se recomienda ejecutar el _build_ desde una
> máquina con conectividad.

---

## Estructura del proyecto

```
app/
  layout.tsx          # Raíz: fuentes, metadata, JSON-LD (Organization)
  page.tsx            # Home: compone todas las secciones
  globals.css         # Tokens de color, base layer, utilidades
  icon.svg            # Favicon
  sitemap.ts          # sitemap.xml
  robots.ts           # robots.txt

components/
  layout/
    Header.tsx            # Header fijo + scroll spy + cambios en scroll
    MobileMenu.tsx        # Menú móvil accesible y animado
    Footer.tsx            # Footer editorial
    StarfieldBackground.tsx  # Fondo procedural (canvas, opcional)
  home/
    Hero.tsx              # Hero editorial + diagrama estelar
    StellarDiagram.tsx    # Visualización orbital (SVG + Framer Motion)
    ServicesGrid.tsx      # Cuatro módulos de servicio
    FeaturedProjects.tsx  # Proyectos destacados
    PhilosophySection.tsx # Filosofía + ilustración humana/cósmica
    TechnologyStack.tsx   # Stack como tabla técnica / coordenadas
    Manifesto.tsx         # Manifiesto con revelado por líneas
    ContactCTA.tsx        # CTA final con constelación
  ui/
    AnimatedHeading.tsx     # Título con revelado línea por línea
    SectionLabel.tsx        # Etiqueta monoespaciada
    MagneticButton.tsx      # Botón con efecto magnético + estrella
    ProjectCard.tsx         # Tarjeta de proyecto con hover
    ServiceItem.tsx         # Módulo de servicio
    TechnicalIllustration.tsx # Ilustración SVG original por proyecto
    Reveal.tsx              # Wrapper de scroll reveal
    StarIcon.tsx            # Estrellas SVG reutilizables
    NoiseOverlay.tsx        # Textura de grano

data/
  site.ts              # Datos: navegación, servicios, proyectos, stack, SEO

lib/
  anim.ts              # Variantes de Framer Motion + easing editorial
  utils.ts             # helper cn()
```

### Modelo de datos

Todo el contenido repetible (servicios, proyectos, tecnologías, enlaces,
metadatos de la estrella y del _site_) se declara en `data/site.ts` y se
renderiza con `.map()`. No hay elementos repetidos escritos a mano.

---

## Dirección visual

- **Paleta:** fondo casi negro con matiz azul (`#02050d`), blanco ligeramente
  cálido (`#f2f1ec`) y azul eléctrico (`#345dff`) como acento.
- **Tipografía:** serif de gran formato (Instrument Serif) para titulares,
  sans (Inter) para texto, monoespaciada (IBM Plex Mono) para etiquetas y
  metadatos. Escalado fluido con `clamp()`.
- **Grilla:** contenedor máximo de 1600 px, separadores horizontales finos,
  bordes rectos o con radios mínimos (0–8 px).
- **Ilustraciones:** todas originales en SVG (diagrama orbital, ilustración
  humana/constelación, ilustraciones técnicas por proyecto). Sin imágenes de
  stock.

---

## Animaciones

- Easing principal: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Duraciones entre 300 y 800 ms (hasta 1.8 s en el revelado inicial del hero).
- Revelado por líneas con máscara (`overflow: hidden`).
- Dibujo de líneas con `pathLength`.
- Rotación orbital lenta (90–160 s) y pulsación suave de la estrella.
- Parallax sutil con el mouse (solo en dispositivos con _pointer_ fino).
- Soporte completo de `prefers-reduced-motion`.
- Hover de proyectos: `scale(1.025)`, revelado de metadatos, cursor «Ver».

---

## Accesibilidad

- HTML semántico y enlaces/botones reales.
- Enlace «Saltar al contenido».
- Navegación por teclado y `focus-visible`.
- Bloqueo y restauración del foco en el menú móvil (con `Esc`).
- Contraste AA y soporte para zoom del navegador.
- `prefers-reduced-motion` respetado en CSS y JS.

---

## SEO

- Metadata completa, Open Graph y Twitter Card.
- `canonical`, `sitemap.xml` y `robots.txt`.
- JSON-LD (`Organization`) en `app/layout.tsx`.
- Idioma principal `es-CL`.

---

## Personalización

- **Textos, enlaces y proyectos:** edita `data/site.ts`.
- **Colores y tipografía:** bloque `@theme` en `app/globals.css` (Tailwind v4, configuración CSS-first).
- **Ilustración del hero:** `components/home/DotField.tsx` genera el campo de
  puntos con un PRNG sembrado; los lóbulos y las opacidades están al principio
  del archivo.
- **Imágenes reales:** colócalas en `public/` y úsalas con `next/image` cuando
  dispongas de los recursos en AVIF/WebP.

---

## Licencia

© Imai. Santiago, Chile.
