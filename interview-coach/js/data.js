// Banco de preguntas por rol. Contenido embebido: no hay llamadas a APIs.
const QUESTIONS = {
  backend: [
    {
      id: "be1",
      text: "¿Qué es una API REST y cómo la diferencias de otros tipos de APIs?",
      keywords: ["rest", "http", "recurso", "estado", "representación", "cliente", "servidor", "stateless"],
      techTerms: ["http", "json", "recursos", "verbos", "urls", "stateless", "recursos"],
      improvedAnswer:
        "Una API REST es una interfaz que permite comunicar sistemas usando HTTP, donde cada dato se modela como un recurso identificado por una URL. Se usa con verbos HTTP (GET, POST, PUT, DELETE) y normalmente intercambia datos en JSON. A diferencia de otras arquitecturas, REST es stateless: cada petición lleva toda la información necesaria y no guarda contexto del cliente en el servidor. Esto la hace simple, escalable y fácil de probar."
    },
    {
      id: "be2",
      text: "¿Qué métodos HTTP conoces y para qué se usa cada uno?",
      keywords: ["get", "post", "put", "patch", "delete", "http", "método"],
      techTerms: ["get", "post", "put", "patch", "delete", "idempotente", "cuerpo"],
      improvedAnswer:
        "Los métodos HTTP más usados son: GET para leer un recurso, POST para crear uno nuevo, PUT para reemplazar un recurso completo, PATCH para modificar parcialmente y DELETE para eliminarlo. GET y DELETE suelen ser idempotentes, es decir, repetirlos produce el mismo resultado. POST no es idempotente porque cada llamada crea un recurso nuevo."
    },
    {
      id: "be3",
      text: "¿Qué es JSON y por qué se usa para intercambiar datos?",
      keywords: ["json", "javascript", "object notation", "texto", "dato", "formato"],
      techTerms: ["json", "clave", "valor", "array", "objeto", "parseo", "serialización"],
      improvedAnswer:
        "JSON (JavaScript Object Notation) es un formato de texto para representar datos estructurados con objetos y arrays, usando pares de clave y valor. Se usa para intercambiar datos entre cliente y servidor porque es legible, liviano y fácil de parsear en casi cualquier lenguaje. En JavaScript se convierte con JSON.parse() y con JSON.stringify()."
    },
    {
      id: "be4",
      text: "¿Cómo validarías los datos que llegan a tu servidor?",
      keywords: ["validar", "validación", "servidor", "datos", "error", "campo"],
      techTerms: ["esquema", "schema", "tipos", "longitud", "sanitizar", "código 400", "respuesta"],
      improvedAnswer:
        "Validaría en el servidor, nunca solo en el cliente: primero verifico que los campos obligatorios existan, luego el tipo de dato, la longitud y los formatos (por ejemplo, email o números). Si algo falla, respondo con un código 400 y un mensaje claro indicando el campo con el problema. También sanitizo las entradas para evitar inyecciones y valido de nuevo cualquier dato antes de guardarlo en la base."
    },
    {
      id: "be5",
      text: "¿Qué códigos de estado HTTP conoces y cuándo se usan?",
      keywords: ["200", "404", "500", "400", "401", "301", "estado", "http"],
      techTerms: ["200", "201", "400", "401", "404", "500", "redirección", "servidor"],
      improvedAnswer:
        "Conozco los códigos por rango: 2xx para éxito (200 OK, 201 creado), 3xx para redirecciones (301), 4xx para errores del cliente (400 petición inválida, 401 sin autorización, 404 no encontrado) y 5xx para errores del servidor (500). Uso 201 al crear un recurso, 400 cuando falla una validación y 404 cuando el recurso no existe."
    }
  ],
  frontend: [
    {
      id: "fe1",
      text: "¿Qué diferencias hay entre HTML, CSS y JavaScript?",
      keywords: ["html", "css", "javascript", "estructura", "estilo", "comportamiento"],
      techTerms: ["etiquetas", "selectores", "dom", "eventos", "estilos"],
      improvedAnswer:
        "HTML define la estructura y el contenido con etiquetas (títulos, párrafos, imágenes). CSS define la presentación: colores, tipografía, espaciado y disposición en pantalla. JavaScript agrega comportamiento e interactividad: detecta eventos, modifica el DOM y responde al usuario. Los tres trabajan juntos: HTML es el esqueleto, CSS la ropa y JavaScript el movimiento."
    },
    {
      id: "fe2",
      text: "¿Qué es el DOM y cómo lo utilizás desde JavaScript?",
      keywords: ["dom", "document object model", "árbol", "nodos", "documento"],
      techTerms: ["querySelector", "getelementbyid", "nodos", "árbol", "eventos", "createelement"],
      improvedAnswer:
        "El DOM es la representación en memoria del documento HTML como un árbol de nodos. JavaScript lo usa para leer o modificar la página: con getElementById o querySelector selecciono elementos, cambio textos con textContent, agrego clases con classList y creo elementos con createElement. También puedo escuchar eventos sobre esos nodos, como clics o envíos de formulario."
    },
    {
      id: "fe3",
      text: "Explicá el box model de CSS.",
      keywords: ["box model", "margin", "border", "padding", "content", "caja"],
      techTerms: ["margin", "border", "padding", "content", "box-sizing", "box-shadow"],
      improvedAnswer:
        "El box model dice que cada elemento es una caja formada por cuatro capas: content (el contenido), padding (espacio interno), border (borde) y margin (espacio externo). El tamaño total suma esas capas. Por eso uso box-sizing: border-box para que padding y border se incluyan en el ancho declarado y así sea más fácil calcular diseños."
    },
    {
      id: "fe4",
      text: "¿Qué eventos de JavaScript conoces y cómo los manejás?",
      keywords: ["evento", "click", "submit", "change", "input", "keydown"],
      techTerms: ["addeventlistener", "preventdefault", "burbuja", "handler", "submit"],
      improvedAnswer:
        "Conozco eventos como click, submit, input, change, keydown y mouseenter. Los manejo con addEventListener indicando el tipo de evento y una función que se ejecuta cuando ocurre. Por ejemplo, en un formulario uso submit y llamo a event.preventDefault() para evitar que la página se recargue y procesar los datos yo mismo."
    },
    {
      id: "fe5",
      text: "¿Qué es la accesibilidad web y por qué es importante?",
      keywords: ["accesibilidad", "accesible", "lector", "pantalla", "teclado", "contraste"],
      techTerms: ["aria", "alt", "labels", "semántica", "contraste", "navegación"],
      improvedAnswer:
        "La accesibilidad web es que el sitio pueda usarse por todas las personas, incluidas quienes usan lector de pantalla o solo teclado. En la práctica: uso etiquetas semánticas (header, nav, main), atributos alt en imágenes, labels vinculados a los inputs, contraste suficiente y foco visible. Es importante porque mejora la experiencia de todos y, en muchos casos, es requisito legal."
    }
  ],
  tester: [
    {
      id: "te1",
      text: "¿Qué diferencia hay entre prueba manual y automatizada?",
      keywords: ["manual", "automatizada", "automatización", "prueba", "tester"],
      techTerms: ["script", "regresión", "herramienta", "framework", "caso de prueba"],
      improvedAnswer:
        "En la prueba manual, una persona ejecuta los casos de prueba siguiendo un guion y observa el resultado. En la automatizada, un script reproduce esas verificaciones con herramientas. La manual es mejor para explorar y validar usabilidad; la automatizada rinde en pruebas repetitivas como regresión. Lo ideal es combinarlas: automatizo lo estable y dejo lo exploratorio en manual."
    },
    {
      id: "te2",
      text: "¿Qué es un bug y cómo lo reportarías?",
      keywords: ["bug", "error", "reporte", "defecto", "resultado esperado"],
      techTerms: ["pasos para reproducir", "severidad", "prioridad", "entorno", "adjunto", "esperado", "obtenido"],
      improvedAnswer:
        "Un bug es un defecto cuando el resultado obtenido no coincide con el esperado. Lo reportaría con un título claro, los pasos exactos para reproducirlo, el resultado esperado vs. el obtenido, el entorno (navegador, dispositivo, versión) y capturas o logs. Además asignaría severidad y prioridad para que el equipo pueda dimensionarlo."
    },
    {
      id: "te3",
      text: "¿Qué son los casos de prueba positivos y negativos?",
      keywords: ["positivo", "negativo", "caso de prueba", "válido", "inválido"],
      techTerms: ["flujos", "bordes", "límites", "validación", "excepción"],
      improvedAnswer:
        "Un caso positivo verifica que el sistema funciona con datos válidos, por ejemplo, iniciar sesión con credenciales correctas. Un caso negativo verifica que el sistema rechace datos inválidos o situaciones de error, como un campo vacío o un email mal formateado. También existe el caso de prueba de borde, que prueba los límites, como el máximo de caracteres permitido."
    },
    {
      id: "te4",
      text: "¿Qué es un smoke test y cuándo se realiza?",
      keywords: ["smoke", "humo", "sanity", "build", "versión"],
      techTerms: ["despliegue", "regresión", "estable", "flujo principal", "ci"],
      improvedAnswer:
        "Un smoke test (o prueba de humo) es una verificación rápida de que el flujo principal de la aplicación funciona después de un build o despliegue nuevo. No busca cubrir todo, sino confirmar que lo crítico responde: por ejemplo, poder iniciar sesión y cargar la pantalla principal. Si falla, se detiene el proceso y se devuelve el build a desarrollo."
    },
    {
      id: "te5",
      text: "¿Qué es una prueba de regresión y por qué se hace?",
      keywords: ["regresión", "regresion", "cambio", "funciona", "antes"],
      techTerms: ["código nuevo", "control de calidad", "automatización", "release"],
      improvedAnswer:
        "La prueba de regresión verifica que cambios nuevos no rompieron funcionalidades que ya funcionaban. Se hace después de cada modificación de código, antes de liberar una versión. Como se repite en cada ciclo, suele automatizarse para reducir tiempos y errores humanos."
    }
  ]
};

const ROLE_LABELS = {
  backend: "Backend Developer",
  frontend: "Frontend Developer",
  tester: "Tester"
};
