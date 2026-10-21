// Lógica de evaluación local (1-5 por criterio). Sin LLM: heurísticas simples sobre el texto.
"use strict";

const CONNECTORS = [
  "porque", "además", "también", "primero", "luego", "después", "entonces",
  "por un lado", "por otro", "por ejemplo", "es decir", "en cambio", "finalmente"
];

const HEDGES = [
  "no sé", "no tengo idea", "ni idea", "no sé nada", "no puedo responder",
  "me parece que", "capaz que", "creo que", "no estoy seguro"
];

const DIRECT_MARKERS = [
  "es", "significa", "consiste en", "se usa", "se utiliza", "permite",
  "diferencia", "funciona", "consta de", "incluye", "básicamente"
];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function wordCount(text) {
  const t = (text || "").trim();
  return t ? t.split(/\s+/).length : 0;
}

function sentences(text) {
  return (text || "").split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
}

function countHits(text, terms) {
  const n = normalize(text);
  return terms.filter(t => n.includes(normalize(t))).length;
}

function scoreClarity(text) {
  const words = wordCount(text);
  const sents = sentences(text);
  if (words < 10) return 1;
  const avgLen = words / Math.max(sents.length, 1);
  let score = 3;
  if (avgLen >= 6 && avgLen <= 40) score += 1;
  if (sents.length >= 2 || words >= 25) score += 1;
  if (avgLen > 60) score -= 1;
  return clamp(score, 1, 5);
}

function scoreStructure(text) {
  const words = wordCount(text);
  if (words < 10) return 1;
  const sents = sentences(text);
  const paragraphs = (text.split(/\n+/) || []).filter(p => p.trim().length > 0).length;
  const connectors = countHits(text, CONNECTORS);
  let score = 3;
  if (sents.length >= 2) score += 1;
  if (connectors >= 1 || paragraphs >= 2) score += 1;
  return clamp(score, 1, 5);
}

function scoreRelevance(text, question) {
  const words = wordCount(text);
  if (words < 6) return 1;
  const total = question.keywords.length || 1;
  const hits = countHits(text, question.keywords);
  const ratio = hits / total;
  if (ratio >= 0.4) return 5;
  if (ratio >= 0.25) return 4;
  if (ratio >= 0.12) return 3;
  if (ratio > 0) return 2;
  return 1;
}

function scoreDepth(text, question) {
  const words = wordCount(text);
  if (words < 12) return 1;
  const hits = countHits(text, question.techTerms);
  const n = normalize(text);
  const explainsWhy = n.includes("porque") || n.includes("ya que") || n.includes("debido");
  let score = 1;
  if (hits >= 1) score = 3;
  if (hits >= 2) score = 4;
  if (hits >= 3 || (hits >= 2 && explainsWhy)) score = 5;
  return clamp(score, 1, 5);
}

function scoreConfidence(text) {
  const words = wordCount(text);
  if (words < 6) return 1;
  const hedges = countHits(text, HEDGES);
  const directs = countHits(text, DIRECT_MARKERS);
  let score = 3;
  if (words >= 15) score += 1;
  if (directs >= 2) score += 1;
  if (hedges >= 2) score -= 1;
  if (/^[a-záéíóúüñ ]{1,10}$/i.test(text.trim())) return 1;
  return clamp(score, 1, 5);
}

function evaluate(text, question) {
  const criteria = {
    clarity: scoreClarity(text),
    structure: scoreStructure(text),
    relevance: scoreRelevance(text, question),
    technicalDepth: scoreDepth(text, question),
    confidence: scoreConfidence(text)
  };
  const raw = Object.values(criteria).reduce((a, b) => a + b, 0); // 5..25
  const percent = Math.round((raw / 25) * 100);
  return { criteria, raw, percent };
}

const CRITERIA_LABELS = {
  clarity: "Claridad",
  structure: "Estructura",
  relevance: "Relevancia",
  technicalDepth: "Profundidad técnica",
  confidence: "Confianza"
};

const CRITERIA_JUSTIFICATION = {
  1: "Muy por debajo de lo esperado para un perfil junior.",
  2: "Algo presente, pero insuficiente.",
  3: "Aceptable, con margen de mejora.",
  4: "Buen nivel, casi completo.",
  5: "Excelente, claro y bien fundamentado."
};

function buildFeedback(result, question) {
  const strengths = [];
  const improvements = [];
  const c = result.criteria;

  // Cada criterio con puntaje 4 o más se muestra como fortaleza.
  for (const [key, value] of Object.entries(c)) {
    if (value >= 4) strengths.push(CRITERIA_LABELS[key]);
  }

  // Cada criterio con puntaje 3 o menos se muestra en "Qué mejorar"
  // (primero los más bajos).
  Object.entries(c)
    .sort((a, b) => a[1] - b[1])
    .forEach(([key, value]) => {
      if (value <= 3) improvements.push(CRITERIA_LABELS[key]);
    });
  if (improvements.length === 0) {
    improvements.push("Agregar ejemplos concretos para reforzar la respuesta");
  }

  if (strengths.length === 0) {
    strengths.push("No se detectaron fortalezas claras");
  }

  return { strengths: strengths, improvements: improvements };
}
