# Especificación: Interview Coach (versión estática)

> Adaptación de `interview-coach-spec.md` a los requisitos de `taller-de-la-idea-a-la-web-spec.md`.

## 1. Visión general

**Interview Coach** es un sitio web estático para que estudiantes y personas junior de software en Argentina practiquen entrevistas técnicas en español rioplatense.

El sitio funciona íntegramente en el navegador con HTML, CSS y JavaScript: no requiere servidor, base de datos ni llamadas a APIs externas. Las preguntas, los ejemplos de respuesta, la lógica de repreguntas y la evaluación están incluidos en el código.

- **Problema:** practicar entrevistas es difícil cuando no hay alguien disponible para hacer preguntas y dar devoluciones concretas.
- **Público objetivo:** personas que buscan su primer trabajo en software y quieren ganar práctica y confianza antes de una entrevista real.
- **Objetivo del proyecto:** crear una práctica técnica simple, comprensible y publicable en GitHub Pages.

## 2. Alcance del MVP

### Incluye

- Tres opciones de práctica: Backend Developer, Frontend Developer y Tester.
- Cinco preguntas predefinidas por rol, presentadas de a una.
- Respuestas por texto y feedback después de cada pregunta.
- Una pantalla final con el resultado de la sesión.
- Interfaz responsive y navegación con teclado.
- Publicación como sitio estático en GitHub Pages.

### No incluye

- Backend, base de datos, Node.js, Express ni endpoints.
- Llamadas a modelos de lenguaje o APIs externas.
- Entrevistas no técnicas, selección de dificultad o selección de temas.
- Funcionalidades que requieran una cuenta de usuario.

El guardado del último puntaje en `localStorage` es opcional y no debe bloquear el flujo principal.

## 3. Requisitos

### Historias de usuario y criterios de aceptación

| Historia de usuario | Criterios de aceptación |
|---|---|
| Como estudiante, quiero elegir Backend Developer, Frontend Developer o Tester para practicar preguntas relacionadas con un rol. | Se muestran exactamente esas tres opciones. Al elegir una, comienza una práctica para ese rol. |
| Como usuario, quiero recibir una pregunta por vez para concentrarme en responderla. | Se muestra la pregunta actual sin revelar las siguientes. |
| Como usuario, quiero responder por texto para practicar sin necesitar micrófono. | Puedo enviar mi respuesta desde un formulario en celular o escritorio. |
| Como usuario, quiero recibir feedback al finalizar cada pregunta para saber qué hice bien y qué mejorar. | Veo puntajes por criterio, aspectos logrados, una mejora concreta y un ejemplo de respuesta mejorada. |
| Como usuario, quiero ver un resumen al final para entender cómo me fue en la sesión. | El resumen incluye el puntaje general, fortalezas y puntos a mejorar. |
| Como usuario, quiero completar la práctica desde el celular. | La interfaz se adapta a pantallas pequeñas y se puede usar con teclado. |

### Requisitos funcionales

| Prioridad | Requisito |
|---|---|
| **Must** | Mostrar las tres opciones de rol al inicio. |
| **Must** | Incluir en JavaScript un banco de al menos cinco preguntas por rol. |
| **Must** | Presentar una pregunta por vez y permitir responder mediante un formulario. |
| **Must** | Evaluar cada respuesta con una rúbrica de cinco criterios, puntuados del 1 al 5. |
| **Must** | Mostrar feedback por pregunta y un ejemplo de respuesta mejorada. |
| **Must** | Mostrar un resumen al completar las preguntas. |
| **Must** | Funcionar como sitio estático y ser compatible con GitHub Pages. |
| **Should** | Ofrecer diseño responsive e indicadores de estado claros. |
| **Could** | Guardar el último puntaje en `localStorage`. |

### Requisitos de calidad

- Usar HTML semántico, formularios con etiquetas y navegación con teclado.
- Adaptar la interfaz a pantallas pequeñas mediante media queries.
- Usar rutas relativas para que el despliegue en GitHub Pages funcione.
- Mantener el código claro y comprensible para que el estudiante pueda modificarlo.

## 4. Roles y contenido

El MVP ofrece exactamente estos roles:

- **Backend Developer:** APIs, HTTP, bases de datos, validación, errores y conceptos de backend.
- **Frontend Developer:** HTML, CSS, JavaScript, DOM, accesibilidad y conceptos de interfaz.
- **Tester:** casos de prueba, pruebas manuales, reporte de bugs y conceptos de calidad.

Las preguntas deben ser predefinidas y apropiadas para personas que buscan su primer empleo. No se ofrecen opciones para cambiar la dificultad, el área o los temas. La práctica es exclusivamente técnica.

### Temas sugeridos para el banco de preguntas

| Rol | Temas |
|---|---|
| **Backend Developer** | API REST; diferencias entre GET, POST, PUT, PATCH y DELETE; JSON; validación de datos; códigos HTTP comunes. |
| **Frontend Developer** | Diferencias entre HTML, CSS y JavaScript; DOM; Box Model en CSS; eventos en JavaScript; accesibilidad básica. |
| **Tester** | Pruebas manuales y automatizadas; bugs; casos de prueba positivos y negativos; reportes de bugs; smoke testing y regresión. |

Cada pregunta debe tener un ejemplo de respuesta mejorada.

## 5. Evaluación y feedback

Cada respuesta recibe una puntuación del 1 al 5 por criterio. La evaluación se calcula con lógica JavaScript basada en palabras clave, longitud y estructura de la respuesta.

| Criterio | Qué evalúa | Guía de puntaje |
|---|---|---|
| **Claridad** | Si la explicación se entiende y usa términos comprensibles. | **1:** difícil de entender. **3:** comprensible, pero con ambigüedad. **5:** clara y precisa. |
| **Estructura** | Si la respuesta está organizada. | **1:** ideas sueltas. **3:** tiene una secuencia básica. **5:** ordenada y fácil de seguir. |
| **Relevancia** | Si responde la pregunta y se mantiene en tema. | **1:** no responde o se desvía. **3:** responde parcialmente. **5:** responde directamente. |
| **Profundidad técnica** | Si explica conceptos con detalle para el nivel junior. | **1:** sin explicación técnica. **3:** incluye algún concepto válido. **5:** explica y justifica correctamente. |
| **Confianza** | Si comunica una respuesta directa y reconoce incertidumbres cuando corresponde. | **1:** evasiva. **3:** con dudas. **5:** directa y calibrada. |

### Cálculo de puntajes

- El puntaje de cada respuesta es la suma de los cinco criterios, entre **5 y 25**.
- El porcentaje de cada respuesta se calcula como `puntaje / 25 × 100`.
- El puntaje de la sesión es el promedio de los porcentajes de las cinco preguntas.

### Feedback por respuesta

Después de cada respuesta se muestra:

1. El puntaje por criterio con una justificación breve.
2. Los aspectos logrados.
3. Cambios concretos para mejorar.
4. Un ejemplo de respuesta mejorada, definido para esa pregunta.
5. El puntaje numérico y su porcentaje.

## 6. Flujo de la aplicación

1. **Inicio (`index.html`):** muestra el título, una breve explicación y los tres roles. Al elegir uno, guarda el rol en `sessionStorage` y redirige a `quiz.html`.
2. **Práctica (`quiz.html`):** presenta una de las cinco preguntas. El usuario escribe y envía su respuesta; después ve la evaluación y el feedback antes de continuar.
3. **Resumen (`result.html`):** al completar las cinco preguntas, muestra el puntaje general, el puntaje por pregunta, las fortalezas y los puntos a mejorar. Opcionalmente, guarda el resultado en `localStorage`.
4. **Navegación:** todo ocurre en el cliente, sin comunicación con un servidor.

## 7. Implementación

### Tecnologías y restricciones

- HTML5, CSS3 y JavaScript vanilla.
- Sin frameworks ni librerías externas obligatorias.
- Sin backend, base de datos, servicios externos ni llamadas a APIs.
- Contenido, ejemplos de respuesta y lógica incluidos en el proyecto.

### Estructura propuesta

```text
interview-coach/
├── index.html      # Inicio y selección de rol
├── quiz.html       # Preguntas, respuestas y feedback
├── result.html     # Resumen de la práctica
├── css/
│   └── style.css   # Estilos responsive
├── js/
│   ├── data.js     # Banco de preguntas por rol
│   ├── app.js      # Lógica principal
│   └── utils.js    # Funciones de evaluación
└── README.md       # Instrucciones y enlace a GitHub Pages
```

## 8. Propósito pedagógico y entregables

El proyecto acompaña el proceso de llevar una idea a una página web: definir objetivos y requisitos, diseñar interfaces con IA a partir de prompts, generar y comprender código, editarlo desde un IDE, probarlo y publicarlo en GitHub Pages. El objetivo es aprender a trabajar con IA, entender el código generado y mejorarlo; no crear una aplicación fullstack compleja.

Entregables:

- [ ] Repositorio de GitHub con el código fuente.
- [ ] Sitio publicado y funcional en GitHub Pages.
- [ ] `README.md` con nombre, descripción, tecnologías, enlace al sitio y una breve explicación del proceso con IA.
- [ ] Prompts utilizados para generar el mockup y el código, incluidos en el README o en un archivo `prompts.md`.
- [ ] Código probado localmente antes del despliegue.

## 9. Prompt base para iniciar con IA

Copia y pega este prompt en tu IA para iniciar el desarrollo:

```text
Actuá como desarrollador front-end. Creá un sitio web estático llamado "Interview Coach" para practicar entrevistas técnicas.

Requisitos:
- Solo HTML, CSS y JavaScript vanilla. Sin Node.js, Express, SQLite ni llamadas a APIs.
- Tres roles: Backend Developer, Frontend Developer y Tester.
- Cinco preguntas por rol embebidas en JavaScript.
- Flujo: inicio (seleccionar rol) -> quiz (pregunta por vez y respuesta) -> resultado (resumen con puntaje).
- Evaluación con cinco criterios: Claridad, Estructura, Relevancia, Profundidad técnica y Confianza (1-5). Calcular el promedio de 0 a 100.
- Mostrar feedback por pregunta y un ejemplo de respuesta mejorada.
- Diseño responsive.
- Preparado para GitHub Pages, con rutas relativas.
- Código claro, comentado solo si es necesario y en español rioplatense.
- Estructura: index.html, quiz.html, result.html, css/style.css, js/data.js, js/app.js, js/utils.js.

Generá primero un mockup simple con HTML/CSS y luego implementá la lógica.
```

## 10. Principios del proyecto

- No seguir la arquitectura completa de `interview-coach-spec.md`: esta versión no incluye backend, SQLite, endpoints `/api/v1` ni un LLM en servidor.
- Seguir la filosofía del taller: llevar una idea a la web con IA y publicarla en GitHub Pages.
- Priorizar simplicidad, funcionalidad y un despliegue correcto sobre la complejidad.
