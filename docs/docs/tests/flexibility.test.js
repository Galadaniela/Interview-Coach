// Comparación de puntajes: respuestas típicas con la rúbrica flexible.
const fs = require("fs");
const path = require("path");
const src = ["data.js", "utils.js"].map(f => fs.readFileSync(path.join(__dirname, "..", "js", f), "utf8")).join("\n");

const script = src + `
let fails = 0;
function check(name, cond) {
  console.log((cond ? "OK   " : "FAIL ") + name);
  if (!cond) fails++;
}

function score(text, role, qi) {
  const q = QUESTIONS[role][qi];
  return evaluate(text, q);
}

const muestras = [
  // [descripción, rol, índice, texto]
  ["vaga (1 palabra)", "backend", 0, "es un protocolo"],
  ["corta sin tema", "backend", 0, "REST es algo de internet que se usa para APIs y cosas asi."],
  ["respuesta decente frontend", "frontend", 0, "HTML da la estructura con etiquetas, CSS los estilos y JavaScript la interactividad con eventos."],
  ["respuesta buena backend", "backend", 0, "Una API REST es una interfaz que usa HTTP para comunicar sistemas mediante recursos identificados por URLs. Se usa con verbos GET, POST, PUT y DELETE, y el estado no se guarda en el servidor. Por ejemplo, se envia datos en JSON porque es legible y liviano."],
  ["respuesta buena tester", "tester", 1, "Un bug es cuando el resultado obtenido no coincide con el esperado. Lo reporto con pasos para reproducirlo, resultado esperado vs obtenido, entorno y capturas, mas severidad y prioridad."],
  ["respuesta buena frontend DOM", "frontend", 1, "El DOM es la representacion del documento HTML como un arbol de nodos. JavaScript lo modifica con querySelector para cambiar textos y clases, y con addEventListener escucha eventos como click o submit."]
];

muestras.forEach(([desc, role, qi, text]) => {
  const r = score(text, role, qi);
  console.log(desc.padEnd(30) + " raw " + r.raw + "/25  pct " + r.percent + "%  " + JSON.stringify(r.criteria));
});

// Guardas: sigue penalizando lo malo, premiando lo bueno
const vaga = score(muestras[0][3], "backend", 0);
const buena = score(muestras[3][3], "backend", 0);
const tester = score(muestras[4][3], "tester", 1);
const dom = score(muestras[5][3], "frontend", 1);
const corta = score(muestras[1][3], "backend", 0);

check("respuesta vaga sigue bajita (<= 45%)", vaga.percent <= 45);
check("respuesta corta y débil <= 60%", corta.percent <= 60);
check("respuesta buena backend >= 80%", buena.percent >= 80);
check("respuesta buena tester >= 80%", tester.percent >= 80);
check("respuesta buena frontend >= 80%", dom.percent >= 80);
check("buena > vaga por amplia diferencia", buena.raw - vaga.raw >= 7);

// Caracter aleatorio sigue en el piso
const x = score("x", "backend", 0);
check("caracter aleatorio sigue 5/25", x.raw === 5);

process.exit(fails ? 1 : 0);
`;
eval(script);
