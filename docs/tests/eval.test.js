const fs = require("fs");
const path = require("path");
const src = ["data.js", "utils.js"].map(f => fs.readFileSync(path.join(__dirname, "..", "js", f), "utf8")).join("\n");
const script = src + `
const q = QUESTIONS.backend[0];
const buena = "Una API REST es una interfaz que usa HTTP para comunicar sistemas mediante recursos identificados por URLs. Se usa con verbos GET, POST, PUT y DELETE, y el estado no se guarda en el servidor. Por ejemplo, se envia datos en JSON.";
const corta = "es un protocolo";
const r1 = evaluate(buena, q);
const r2 = evaluate(corta, q);
console.log("Buena ->", JSON.stringify(r1.criteria), "raw", r1.raw, "pct", r1.percent);
console.log("Corta ->", JSON.stringify(r2.criteria), "raw", r2.raw, "pct", r2.percent);
Object.keys(QUESTIONS).forEach(r => console.log(r + ":", QUESTIONS[r].length, "preguntas"));
if (r1.raw <= r2.raw) { console.log("FAIL: la respuesta buena debe puntuar mas alta"); process.exit(1); }
if (r1.raw < 15 || r1.raw > 25) { console.log("FAIL: rango inesperado"); process.exit(1); }
if (r2.raw < 5) { console.log("FAIL: minimo 5"); process.exit(1); }
console.log("OK");
`;
eval(script);
