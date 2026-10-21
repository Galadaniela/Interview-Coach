// Simula las tres páginas para confirmar que no hay bucles de redirección.
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const src = ["data.js", "utils.js", "app.js"]
  .map(f => fs.readFileSync(path.join(__dirname, "..", "js", f), "utf8"))
  .join("\n");

function makeDom(page) {
  const ids = {
    index: ["roles", "live-region"],
    quiz: ["answer-form", "role-name", "progress", "progress-bar", "question-text",
           "answer-text", "form-error", "feedback", "next-btn", "exit-btn", "live-region"],
    result: ["result-list", "result-role", "result-score", "result-strengths",
             "result-improvements", "restart-btn"]
  }[page];
  const els = {};
  ids.forEach(id => {
    els[id] = {
      id, style: {}, dataset: {}, hidden: false, textContent: "", innerHTML: "",
      value: "", addEventListener() {}, focus() {}, setAttribute() {}, removeAttribute() {},
      appendChild() {}
    };
  });
  const dom = {
    getElementById: id => els[id] || null,
    createElement: () => {
      const el = { style: {}, dataset: {}, _t: "", addEventListener() {}, appendChild() {} };
      Object.defineProperty(el, "textContent", { set(v) { this._t = v; }, get() { return this._t; } });
      Object.defineProperty(el, "innerHTML", { set(v) { this._t = v; }, get() { return this._t; } });
      return el;
    },
    addEventListener(type, cb) { if (type === "DOMContentLoaded") this._ready = cb; },
    _ready: null
  };
  return dom;
}

function run(page, withSession) {
  const dom = makeDom(page);
  const redirects = [];
  const store = {};
  const session = withSession
    ? JSON.stringify({ role: "backend", index: 0, results: [], startedAt: new Date().toISOString() })
    : null;
  if (session) store["ic_session"] = session;
  const sandbox = {
    document: dom,
    console,
    sessionStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = v; }, removeItem: k => { delete store[k]; } },
    localStorage: { getItem: () => null, setItem: () => {} },
    setTimeout: fn => fn()
  };
  sandbox.window = { location: { href: "", replace: u => redirects.push(u) } };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox);
  dom._ready();
  return redirects;
}

let failures = 0;
function check(name, redirects, expected) {
  const ok = redirects.length === expected;
  console.log((ok ? "OK   " : "FAIL ") + name + " -> redirecciones: " +
    (redirects.length ? redirects.join(", ") : "ninguna") + " (esperadas: " + expected + ")");
  if (!ok) failures++;
}

// Caso crítico: index.html NO debe redirigirse a sí mismo (bucle de recarga)
check("index sin sesión", run("index", false), 0);
check("index con sesión", run("index", true), 0);
// quiz/result sin sesión deben ir a index una sola vez
check("quiz sin sesión", run("quiz", false), 1);
check("result sin sesión", run("result", false), 1);
// con sesión no deben redirigir
check("quiz con sesión", run("quiz", true), 0);
check("result sin resultados", run("result", true), 1); // results vacío -> a index

process.exit(failures ? 1 : 0);
