# Registro de errores y prompts utilizados

Registro del trabajo práctico organizado en errores reportados, historial de prompts y prompts reutilizables para el proyecto.

---

## 1. Errores reportados

> Se listan únicamente los errores indicados por el usuario.

1. El archivo nuevo no se veía en la carpeta.
2. La página no paraba de recargarse y no dejaba navegar.
3. En "Lo que hiciste bien" siempre aparecía "Respuesta concreta al tema propuesto", sin importar la respuesta (incluso con un carácter aleatorio).
4. Los puntajes del feedback eran exageradamente estrictos: si la respuesta no se escribía tal cual se esperaba, no se llegaba a un puntaje alto.

## 2. Historial de prompts

Prompts de la conversación con la IA, en orden:

1. **"que tengo en esta carpeta?"**
   → Inventario de archivos del directorio de usuario.

2. **"ubicate acá `C:\Users\Iván\Desktop\Cursado\Programación 1 - Algoritmos y Estructura de Datos\4to Parcial`"**
   → Cambio de contexto al directorio del trabajo práctico.

3. **"Si"** (respuesta a "¿quieres que lea el archivo?")
   → Lectura de `interview-coach-spec.md`.

4. **"Acabé de agregar un archivo .pdf, este archivo es el que nos guía para hacer el trabajo práctico propuesto. Decime si el archivo .md cumple y cubre con lo explicado en ese pdf"**
   → Comparación spec vs. consigna del taller.

5. **"lee el pdf completo"**
   → Extracción del texto completo de `TALLER_WEB_IA_Github_Pages.pdf` (31 páginas).

6. **"Edita el .md ajustando lo necesario para que sea compatible con lo que pide el .pdf. crea un archivo .md a parte, no edites el que ya está"**
   → Creación de `taller-de-la-idea-a-la-web-spec.md` (consigna estática + GitHub Pages), conservando el original.

7. **"Necesito armar un Spec Driven Development: Usa cómo base el archivo llamado interview-coach-spec.md teniendo en cuenta y cumpliendo lo que el archivo taller-de-la-idea-a-la-web-spec.md"**
   → Creación de `interview-coach-sdd-github-pages.md` (spec adaptada a sitio estático).

8. **"Ejecuta el proyecto, sin desplegar nada"**
   → Implementación del sitio (`index.html`, `quiz.html`, `result.html`, CSS, JS) y ejecución en local con `python -m http.server 8000`.

9. **"está bug, no me deja navegar porque no para de actualizarse"**
   → Detección y corrección del bucle de recarga.

10. **"armar un archivo .md donde muestre los errores presentados y los prompts usados"**
    → Este documento.

11. **"Corregir punto 1: Que los errores que muestre sean únicamente los que yo indique y voy a indicar"**
    → Se redefinió la sección 1: solo errores indicados por el usuario.

12. **"agrega los errores que ya indiqué, cómo por ejemplo lo de que la página no paraba de recargarse"**
    → Se dejaron solo: archivo invisible y bucle de recarga.

13. **"Punto 1: Quitar causa, solución con código y verificación, dejar únicamente el error"**
    → Se simplificó la sección 1 a una lista de errores.

14. **"Cuándo se responde una pregunta siempre aparece 'Respuesta concreta al tema propuesto' en el apartado de 'Lo que hiciste bien', sin importar si la respuesta realmente sea una respuesta concreta, inclusive cuándo es un caracter aleatorio. Necesito que el criterio sea más exigente"**
    → Se corrigió `buildFeedback()` en `js/utils.js`: se eliminó el fallback que inventaba fortalezas; nuevas reglas de exigencia.

15. **"Necesito que por cada criterio, en caso de llegar a 4 puntos o más mostrarlo cómo fortaleza."**
    → Cada criterio con puntaje >= 4 se lista como fortaleza, sin límite de cantidad.

16. **"En caso de que el puntaje sea 3, agregar el criterio en 'Qué mejorar'"**
    → "Qué mejorar" ahora incluye los criterios con puntaje <= 3, ordenados de menor a mayor.

17. **"en el mensaje de 'No se detectaron fortalezas claras: ningún criterio llegó a 4 puntos' que quede únicamente 'No se detectaron fortalezas claras'"**
    → Mensaje de sin fortalezas simplificado.

18. **"agregar los errores y los prompts que se usaron hasta acá, actualizar el archivo errores-y-prompts.md"**
    → Actualización de este documento.

19. **"Estoy viendo que los puntajes que da cómo feedback son exageradamente estrictos, si no se pone la respuesta tal y cuál se espera, no se llega a un puntaje alto. Necesito que sea un poco más flexible"**
    → Se relajaron los umbrales de la rúbrica en `js/utils.js` (claridad, estructura, relevancia, profundidad técnica y confianza) y se agregó `tests/flexibility.test.js` para verificar que siga penalizando lo vago y premiando lo bueno.

20. **"Ahora agrega los errores y los prompts utilizados a los .md correspondientes"**
    → Actualización de este documento con el error 4 y los prompts 19-20.

## 3. Prompts reutilizables

### 3.1 Prompt base para generar el proyecto

Incluido en la spec (`interview-coach-sdd-github-pages.md`, sección 13). Sirve para arrancar el desarrollo desde cero:
```text
Actuá como desarrollador front-end. Creá un sitio web estático llamado "Interview Coach" para practicar entrevistas técnicas.

Requisitos:
- Solo HTML, CSS y JavaScript vanilla. Sin Node.js, Express, SQLite ni llamadas a APIs.
- Tres roles: Backend Developer, Frontend Developer, Tester.
- 5 preguntas por rol embebidas en JS.
- Flujo: inicio (seleccionar rol) -> quiz (pregunta por vez + respuesta) -> resultado (resumen con puntaje).
- Evaluación con 5 criterios: Claridad, Estructura, Relevancia, Profundidad técnica, Confianza (1-5). Calcular promedio 0-100.
- Mostrar feedback por pregunta y ejemplo de respuesta mejorada.
- Diseño responsive.
- Preparado para GitHub Pages (rutas relativas).
- Código claro, en español rioplatense.
- Estructura: index.html, quiz.html, result.html, css/style.css, js/data.js, js/app.js, js/utils.js

Generá primero un mockup simple con HTML/CSS y luego implementá la lógica.
```

### 3.2 Prompts sugeridos para las etapas del taller

| Etapa | Prompt sugerido |
|---|---|
| Requerimientos | "Ayudame a definir los requisitos de una web para practicar entrevistas técnicas de programación, con roles de Backend, Frontend y Tester." |
| Mockup | "Creá un mockup en HTML/CSS de una landing con 3 tarjetas de roles, una pantalla de preguntas y una de resultados, estilo limpio y responsive." |
| Generación de código | Usar el prompt base (3.1). |
| Mejora | "Revisá este HTML/CSS/JS: mejorá la accesibilidad, el contraste y el responsive. Explicá qué cambiaste y por qué." |
| Pruebas | "Revisá este código en busca de bugs de navegación, recargas infinitas y errores de scope en JavaScript." |
