// Regla: cada criterio con puntaje >= 4 se muestra como fortaleza (sin límite).
const fs = require("fs");
const path = require("path");
const src = ["data.js", "utils.js"].map(f => fs.readFileSync(path.join(__dirname, "..", "js", f), "utf8")).join("\n");

const script = src + `
const NO_STRENGTH = "No se detectaron fortalezas claras";
const OLD_FAKE = "Respuesta concreta al tema propuesto";
let fails = 0;
function check(name, cond) {
  console.log((cond ? "OK   " : "FAIL ") + name);
  if (!cond) fails++;
}

function feedbackFor(text, role, qi) {
  const q = QUESTIONS[role || "backend"][qi || 0];
  const r = evaluate(text, q);
  return { r, fb: buildFeedback(r, q) };
}

// 1. Regla principal: fortalezas == criterios con puntaje >= 4
const buena = "Una API REST es una interfaz que usa HTTP para comunicar sistemas mediante recursos identificados por URLs. Se usa con verbos GET, POST, PUT y DELETE, y el estado no se guarda en el servidor. Por ejemplo, se envia datos en JSON porque es legible y liviano y permite que cualquier cliente los entienda sin acoplarse.";
const a = feedbackFor(buena);
const esperadas = Object.entries(a.r.criteria)
  .filter(([, v]) => v >= 4)
  .map(([k]) => CRITERIA_LABELS[k]);
check("fortalezas == criterios >= 4", JSON.stringify(a.fb.strengths) === JSON.stringify(esperadas));
console.log("   criterios:", JSON.stringify(a.r.criteria), "| fortalezas:", JSON.stringify(a.fb.strengths));

// 2. Todas las fortalezas visibles (sin cortar en 2)
const todos = Object.values(a.r.criteria).filter(v => v >= 4).length;
check("muestra todos los criterios >= 4 (" + todos + ")", a.fb.strengths.length === todos);

// 3. Caracter aleatorio: sin fortaleza falsa
const b = feedbackFor("x");
check("caracter aleatorio: mensaje de sin fortalezas", b.fb.strengths.length === 1 && b.fb.strengths[0].includes(NO_STRENGTH));
check("caracter aleatorio: sin texto viejo", !b.fb.strengths.join(" ").includes(OLD_FAKE));

// 4. Caso limite: un unico criterio en 4 debe mostrarse aunque el total sea bajo
const c = feedbackFor("bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla");
console.log("   debil -> raw", c.r.raw, "| criterios:", JSON.stringify(c.r.criteria));
const solo4 = Object.entries(c.r.criteria).filter(([, v]) => v >= 4).map(([k]) => CRITERIA_LABELS[k]);
check("respuestas debiles: fortalezas == criterios >= 4", JSON.stringify(c.fb.strengths) === JSON.stringify(solo4));

// 5. Todas las respuestas evaluadas respetan la regla
const muestras = [
  "x",
  "no se",
  "REST es algo de internet que se usa para APIs y cosas asi.",
  "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla",
  buena,
  "El DOM es la representacion del documento HTML como un arbol de nodos. JavaScript lo modifica con querySelector para cambiar textos y clases, y con addEventListener escucha eventos como click o submit.",
  "Un bug es cuando el resultado obtenido no coincide con el esperado. Lo reporto con pasos para reproducirlo, resultado esperado vs obtenido, entorno y capturas, mas severidad y prioridad."
];
muestras.forEach((t, i) => {
  const x = feedbackFor(t, i % 2 === 0 ? "backend" : "tester", i % 5);
  const esp = Object.entries(x.r.criteria).filter(([, v]) => v >= 4).map(([k]) => CRITERIA_LABELS[k]);
  const esperado = esp.length > 0 ? esp : [NO_STRENGTH];
  check("muestra " + (i + 1) + ": regla >= 4 aplicada", JSON.stringify(x.fb.strengths) === JSON.stringify(esperado));
});

// 6. Regla de mejoras: criterios con puntaje <= 3 (ordenados de menor a mayor)
muestras.forEach((t, i) => {
  const x = feedbackFor(t, i % 2 === 0 ? "backend" : "tester", i % 5);
  const esp = Object.entries(x.r.criteria)
    .filter(([, v]) => v <= 3)
    .sort((a, b) => a[1] - b[1])
    .map(([k]) => CRITERIA_LABELS[k]);
  const esperado = esp.length > 0 ? esp : ["Agregar ejemplos concretos para reforzar la respuesta"];
  check("muestra " + (i + 1) + ": mejoras == criterios <= 3", JSON.stringify(x.fb.improvements) === JSON.stringify(esperado));
});

// 7. Caso puntaje 3 exacto: debe aparecer en mejoras
const conTres = muestras.map((t, i) => feedbackFor(t, i % 2 === 0 ? "backend" : "tester", i % 5))
  .find(x => Object.values(x.r.criteria).includes(3));
if (conTres) {
  const tiene3 = Object.entries(conTres.r.criteria).some(([, v]) => v === 3);
  const labels3 = Object.entries(conTres.r.criteria).filter(([, v]) => v === 3).map(([k]) => CRITERIA_LABELS[k]);
  check("puntaje 3 presente en mejoras", tiene3 && labels3.every(l => conTres.fb.improvements.includes(l)));
  console.log("   criterios:", JSON.stringify(conTres.r.criteria), "| mejoras:", JSON.stringify(conTres.fb.improvements));
} else {
  check("puntaje 3 presente en mejoras (sin muestra)", false);
}

process.exit(fails ? 1 : 0);
`;
eval(script);
