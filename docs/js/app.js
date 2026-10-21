"use strict";

// ---------- helpers de sesión ----------
function getSession() {
  try {
    return JSON.parse(sessionStorage.getItem("ic_session") || "null");
  } catch (e) {
    return null;
  }
}

function saveSession(s) {
  sessionStorage.setItem("ic_session", JSON.stringify(s));
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

// ---------- pantalla de inicio ----------
function initHome() {
  const container = document.getElementById("roles");
  if (!container) return;
  Object.keys(ROLE_LABELS).forEach(role => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "role-card";
    btn.dataset.role = role;
    btn.innerHTML =
      "<h2>" + escapeHtml(ROLE_LABELS[role]) + "</h2>" +
      "<p>" + escapeHtml(describeRole(role)) + "</p>" +
      "<span class='role-cta'>Comenzar práctica →</span>";
    btn.addEventListener("click", () => {
      saveSession({
        role: role,
        index: 0,
        results: [],
        startedAt: new Date().toISOString()
      });
      window.location.href = "quiz.html";
    });
    container.appendChild(btn);
  });
}

function describeRole(role) {
  const desc = {
    backend: "APIs, HTTP, bases de datos, validación y errores de servidor.",
    frontend: "HTML, CSS, JavaScript, DOM, accesibilidad e interfaz.",
    tester: "Casos de prueba, bugs, pruebas manuales y automatizadas."
  };
  return desc[role] || "";
}

// ---------- pantalla de práctica ----------
function initQuiz() {
  if (!document.getElementById("answer-form")) return; // no es quiz.html
  const session = getSession();
  if (!session || !QUESTIONS[session.role]) {
    window.location.replace("index.html");
    return;
  }

  const questions = QUESTIONS[session.role];
  const total = questions.length;

  const roleEl = document.getElementById("role-name");
  const progressEl = document.getElementById("progress");
  const progressBar = document.getElementById("progress-bar");
  const questionEl = document.getElementById("question-text");
  const form = document.getElementById("answer-form");
  const textarea = document.getElementById("answer-text");
  const errorEl = document.getElementById("form-error");
  const feedbackEl = document.getElementById("feedback");
  const nextBtn = document.getElementById("next-btn");
  const exitBtn = document.getElementById("exit-btn");
  const announce = document.getElementById("live-region");

  function renderQuestion() {
    const q = questions[session.index];
    roleEl.textContent = ROLE_LABELS[session.role];
    progressEl.textContent = "Pregunta " + (session.index + 1) + " de " + total;
    progressBar.style.width = ((session.index) / total) * 100 + "%";
    questionEl.textContent = q.text;
    textarea.value = "";
    errorEl.textContent = "";
    errorEl.hidden = true;
    feedbackEl.hidden = true;
    feedbackEl.innerHTML = "";
    nextBtn.hidden = true;
    form.hidden = false;
    announce.textContent = "Nueva pregunta: " + q.text;
    textarea.focus();
  }

  form.addEventListener("submit", ev => {
    ev.preventDefault();
    const text = textarea.value.trim();

    if (!text) {
      errorEl.textContent = "Ingresá una respuesta para continuar.";
      errorEl.hidden = false;
      textarea.setAttribute("aria-invalid", "true");
      textarea.focus();
      return;
    }

    textarea.removeAttribute("aria-invalid");
    const q = questions[session.index];
    const result = evaluate(text, q);
    const fb = buildFeedback(result, q);

    session.results.push({
      questionId: q.id,
      text: text,
      criteria: result.criteria,
      raw: result.raw,
      percent: result.percent,
      strengths: fb.strengths,
      improvements: fb.improvements
    });
    saveSession(session);

    showFeedback(q, result, fb);
    form.hidden = true;
    nextBtn.hidden = false;
    nextBtn.focus();
    announce.textContent = "Feedback disponible. Puntaje: " + result.percent + " sobre 100.";
  });

  function showFeedback(q, result, fb) {
    let rows = "";
    for (const [key, value] of Object.entries(result.criteria)) {
      rows +=
        "<tr><th scope='row'>" + escapeHtml(CRITERIA_LABELS[key]) + "</th>" +
        "<td class='score-cell'>" + value + " / 5</td>" +
        "<td>" + escapeHtml(CRITERIA_JUSTIFICATION[value]) + "</td></tr>";
    }

    feedbackEl.innerHTML =
      "<h3>Feedback de tu respuesta</h3>" +
      "<p class='big-score'>" + result.percent + " <span>/ 100</span> · " +
      "<strong>" + result.raw + " / 25 puntos</strong></p>" +
      "<table class='rubric'><caption>Puntaje por criterio</caption><tbody>" + rows + "</tbody></table>" +
      "<div class='fb-columns'>" +
      "<div><h4>Lo que hiciste bien</h4><ul>" +
      fb.strengths.map(s => "<li>" + escapeHtml(s) + "</li>").join("") +
      "</ul></div>" +
      "<div><h4>Qué mejorar</h4><ul>" +
      fb.improvements.map(s => "<li>" + escapeHtml(s) + "</li>").join("") +
      "</ul></div></div>" +
      "<div class='improved'><h4>Ejemplo de respuesta mejorada</h4>" +
      "<p class='warn'>Este ejemplo puede incluir conceptos que tu respuesta no mostraba. Usalo para estudiar, no como experiencia propia.</p>" +
      "<p>" + escapeHtml(q.improvedAnswer) + "</p></div>" +
      "<p class='disclaimer'>Los puntajes son orientativos: la evaluación automática puede equivocarse y no reemplaza una devolución profesional.</p>";
    feedbackEl.hidden = false;
  }

  nextBtn.addEventListener("click", () => {
    session.index += 1;
    if (session.index >= total) {
      finishSession(session);
      window.location.href = "result.html";
      return;
    }
    saveSession(session);
    renderQuestion();
  });

  exitBtn.addEventListener("click", () => {
    if (session.results.length === 0) {
      sessionStorage.removeItem("ic_session");
    } else {
      session.abandoned = true;
      saveSession(session);
    }
    window.location.href = "index.html";
  });

  renderQuestion();
}

function finishSession(session) {
  const scores = session.results.map(r => r.percent);
  session.overall = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;
  session.finishedAt = new Date().toISOString();
  saveSession(session);

  // historial local (localStorage)
  try {
    const history = JSON.parse(localStorage.getItem("ic_history") || "[]");
    history.unshift({
      role: session.role,
      roleLabel: ROLE_LABELS[session.role],
      date: session.finishedAt,
      overall: session.overall,
      abandoned: false
    });
    localStorage.setItem("ic_history", JSON.stringify(history.slice(0, 20)));
  } catch (e) {
    /* almacenamiento no disponible: se ignora */
  }
}

// ---------- pantalla de resumen ----------
function initResult() {
  if (!document.getElementById("result-list")) return; // no es result.html
  const session = getSession();
  if (!session || !session.results || session.results.length === 0) {
    window.location.replace("index.html");
    return;
  }

  document.getElementById("result-role").textContent = ROLE_LABELS[session.role];
  document.getElementById("result-score").textContent = session.overall;

  const list = document.getElementById("result-list");
  list.innerHTML = session.results
    .map((r, i) => {
      const q = QUESTIONS[session.role].find(x => x.id === r.questionId);
      return (
        "<li><span class='q'>" + escapeHtml((q && q.text) || "Pregunta " + (i + 1)) + "</span>" +
        "<span class='p'>" + r.percent + " / 100</span></li>"
      );
    })
    .join("");

  // fortalezas y mejoras recurrentes
  const counts = {};
  session.results.forEach(r => {
    r.improvements.forEach(c => {
      counts[c] = (counts[c] || 0) + 1;
    });
  });
  const recurring = Object.entries(counts)
    .filter(([k, v]) => v >= 2)
    .map(([k]) => k);

  const strengths = new Set();
  session.results.forEach(r => r.strengths.forEach(s => strengths.add(s)));
  document.getElementById("result-strengths").innerHTML =
    Array.from(strengths).map(s => "<li>" + escapeHtml(s) + "</li>").join("") ||
    "<li>Completaste las cinco preguntas</li>";

  document.getElementById("result-improvements").innerHTML =
    recurring.length > 0
      ? recurring.map(s => "<li>" + escapeHtml(s) + " <em>(repetido en varias respuestas)</em></li>").join("")
      : "<li>Mantené el mismo nivel en las próximas prácticas</li>";

  document.getElementById("restart-btn").addEventListener("click", () => {
    sessionStorage.removeItem("ic_session");
    window.location.href = "index.html";
  });
}

// ---------- arranque ----------
document.addEventListener("DOMContentLoaded", () => {
  initHome();
  initQuiz();
  initResult();
});
