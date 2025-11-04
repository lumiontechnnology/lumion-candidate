/**
 * Interview Service
 * Provides role-specific question banks and evaluates candidate responses
 * to simulate pre-interview practice with targeted feedback.
 */

const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack Engineer', 'Data Scientist', 'Product Manager'];
const levels = ['Entry', 'Mid', 'Senior'];

// Question bank
const questionBank = {
  'Frontend Developer': {
    technical: [
      { id: 'fe-tech-1', prompt: 'Explain the virtual DOM and how React reconciles updates.', expected: ['virtual DOM', 'reconciliation', 'diffing', 'fiber', 'batching'], difficulty: 'mid' },
      { id: 'fe-tech-2', prompt: 'How would you optimize a large React application?', expected: ['memoization', 'code splitting', 'lazy loading', 'virtualization', 'profiling'], difficulty: 'senior' },
      { id: 'fe-tech-3', prompt: 'Describe how CSS-in-JS differs from traditional CSS.', expected: ['scoping', 'runtime', 'style objects', 'SSR', 'critical CSS'], difficulty: 'entry' },
    ],
    behavioral: [
      { id: 'fe-beh-1', prompt: 'Tell me about a time you improved accessibility in a product.', expected: ['WCAG', 'ARIA', 'keyboard', 'contrast', 'screen reader'], difficulty: 'mid', type: 'STAR' },
    ],
    system: [
      { id: 'fe-sys-1', prompt: 'Design a dashboard rendering thousands of rows efficiently.', expected: ['virtualization', 'windowing', 'pagination', 'memo', 'defer'], difficulty: 'senior' },
    ],
  },
  'Backend Developer': {
    technical: [
      { id: 'be-tech-1', prompt: 'Explain CAP theorem and trade-offs.', expected: ['consistency', 'availability', 'partition tolerance', 'trade-offs'], difficulty: 'senior' },
      { id: 'be-tech-2', prompt: 'How do you scale a REST API under heavy load?', expected: ['caching', 'load balancer', 'horizontal scaling', 'rate limiting', 'queueing'], difficulty: 'mid' },
    ],
    behavioral: [
      { id: 'be-beh-1', prompt: 'Describe a time you resolved a production incident.', expected: ['root cause', 'rollback', 'monitoring', 'postmortem', 'prevention'], difficulty: 'mid', type: 'STAR' },
    ],
    system: [
      { id: 'be-sys-1', prompt: 'Design a URL shortening service.', expected: ['hashing', 'database', 'collision', 'scaling', 'cache'], difficulty: 'mid' },
    ],
  },
  'Data Scientist': {
    technical: [
      { id: 'ds-tech-1', prompt: 'Bias-variance trade-off in machine learning.', expected: ['overfitting', 'underfitting', 'regularization', 'cross-validation'], difficulty: 'entry' },
    ],
    behavioral: [
      { id: 'ds-beh-1', prompt: 'Tell me about a model that failed and what you learned.', expected: ['evaluation', 'metrics', 'validation', 'iteration', 'stakeholders'], difficulty: 'mid', type: 'STAR' },
    ],
    system: [
      { id: 'ds-sys-1', prompt: 'Design an online prediction service for recommender systems.', expected: ['feature store', 'latency', 'batch vs streaming', 'A/B testing', 'monitoring'], difficulty: 'senior' },
    ],
  },
  'Product Manager': {
    technical: [
      { id: 'pm-tech-1', prompt: 'Define and prioritize a metrics framework for a new feature.', expected: ['north star', 'leading indicators', 'lagging', 'KPI', 'OKR'], difficulty: 'mid' },
    ],
    behavioral: [
      { id: 'pm-beh-1', prompt: 'Tell me about a time you aligned stakeholders with conflicting goals.', expected: ['trade-offs', 'communication', 'alignment', 'roadmap', 'success criteria'], difficulty: 'senior', type: 'STAR' },
    ],
    system: [
      { id: 'pm-sys-1', prompt: 'Design an MVP for a job search automation product.', expected: ['user journey', 'problem', 'assumptions', 'risks', 'validation'], difficulty: 'entry' },
    ],
  }
};

function getRoles() { return roles; }
function getLevels() { return levels; }

function getQuestionBank(role, sessionType = 'mixed') {
  const bank = questionBank[role] || questionBank['Frontend Developer'];
  if (sessionType === 'mixed') {
    return [
      ...(bank.technical || []).slice(0, 2),
      ...(bank.behavioral || []).slice(0, 1),
      ...(bank.system || []).slice(0, 1),
    ];
  }
  return (bank[sessionType] || []).slice(0, 4);
}

// Evaluate response with simple heuristics
function evaluateAnswer(answer, question) {
  const text = (answer || '').toLowerCase();
  const keywords = question.expected || [];
  const matched = keywords.filter(k => text.includes(k.toLowerCase()));
  const keywordCoverage = Math.round((matched.length / Math.max(1, keywords.length)) * 100);
  const clarity = Math.min(100, 60 + Math.floor(text.length / 100));
  const structure = question.type === 'STAR' ? scoreSTAR(text) : Math.min(100, 50 + matched.length * 10);
  const depth = Math.min(100, 40 + matched.length * 12);
  const overall = Math.round((keywordCoverage * 0.35) + (clarity * 0.2) + (structure * 0.25) + (depth * 0.2));

  const suggestions = [];
  if (keywordCoverage < 70) suggestions.push(`Mention more role-specific concepts: ${keywords.join(', ')}`);
  if (question.type === 'STAR' && structure < 75) suggestions.push('Use STAR: Situation, Task, Action, Result with measurable impact.');
  if (depth < 70) suggestions.push('Add implementation specifics, trade-offs, and measurable outcomes.');
  if (clarity < 70) suggestions.push('Tighten phrasing, use concise sentences, and avoid filler.');

  return { keywordCoverage, clarity, structure, depth, overall, matched, suggestions };
}

function scoreSTAR(text) {
  const s = /situation|context|background/i.test(text) ? 1 : 0;
  const t = /task|goal|objective/i.test(text) ? 1 : 0;
  const a = /action|implemented|built|designed|led/i.test(text) ? 1 : 0;
  const r = /result|impact|outcome|metrics|kpi|percent/i.test(text) ? 1 : 0;
  return (s + t + a + r) * 25 + (r ? 10 : 0);
}

function summarizeSession(evaluations) {
  const avg = (arr) => Math.round(arr.reduce((a, b) => a + b, 0) / Math.max(1, arr.length));
  return {
    overall: avg(evaluations.map(e => e.overall)),
    keywordCoverage: avg(evaluations.map(e => e.keywordCoverage)),
    clarity: avg(evaluations.map(e => e.clarity)),
    structure: avg(evaluations.map(e => e.structure)),
    depth: avg(evaluations.map(e => e.depth)),
  };
}

export default {
  getRoles,
  getLevels,
  getQuestionBank,
  evaluateAnswer,
  summarizeSession,
};