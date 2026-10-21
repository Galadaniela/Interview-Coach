# Interview Coach — Versión estática (GitHub Pages)

Práctica de entrevistas técnicas en español rioplatense. Sitio **estático**: solo HTML, CSS y JavaScript. Sin backend, sin base de datos, sin APIs externas.

## Requisitos
- Un navegador moderno.
- Opcional (para servirlo en local): Python 3 o cualquier servidor estático.

## Cómo ejecutar en local

```bash
cd interview-coach
python -m http.server 8000
```

Abrí <http://localhost:8000> en el navegador.

También podés abrir `index.html` directamente con doble clic (no hace falta servidor).

## Estructura

```text
interview-coach/
├── index.html      # Inicio: selección de rol
├── quiz.html       # Preguntas y respuestas (una por vez)
├── result.html     # Resumen final
├── css/style.css   # Estilos responsive y accesibles
├── js/data.js      # Banco de 5 preguntas por rol con ejemplos mejorados
├── js/utils.js     # Rúbrica: evaluación 1-5 por criterio (Claridad, Estructura, Relevancia, Profundidad técnica, Confianza)
└── js/app.js       # Flujo de sesión, feedback y resumen
```

## Variables de entorno

No hace falta ninguna: no hay claves ni llamadas a servicios.

## Publicación (GitHub Pages)

Subir la carpeta `interview-coach/` a un repositorio y activar GitHub Pages desde *Settings → Pages → rama `main` / carpeta raíz*.

## Proceso con IA

Desarrollado con asistencia de IA a partir de:
- `taller-de-la-idea-a-la-web-spec.md` (consigna del taller)
- `interview-coach-spec.md` (idea original)
- `interview-coach-sdd-github-pages.md` (spec adaptada)
