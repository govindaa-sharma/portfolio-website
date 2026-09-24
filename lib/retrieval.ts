// lib/retrieval.ts
//
// A deliberately small retrieval layer. The knowledge base here is a few
// dozen short, hand-authored chunks (see data/knowledge.ts) — small enough
// that a vector database would be overhead, not value. So retrieval is
// TF-IDF-style keyword scoring: fast, dependency-free, fully explainable,
// and it runs at request time with no build step.
//
// The architecture is still a real retrieval boundary, not a hardcoded
// prompt: the model only ever sees the top-K scored chunks for a given
// question, never the full knowledge base. That boundary is what makes it
// easy to swap in real embeddings (e.g. Gemini's embedding endpoint + a
// vector store) later without touching the API route or the UI — only
// this file would change.

import { buildKnowledgeChunks, type KnowledgeChunk } from "@/data/knowledge";

const STOPWORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "what", "which", "who", "whom", "this", "that", "these", "those",
  "and", "or", "but", "if", "then", "so", "of", "at", "by", "for",
  "with", "about", "against", "between", "into", "through", "during",
  "to", "from", "in", "on", "off", "over", "under", "again", "further",
  "he", "him", "his", "does", "do", "did", "has", "have", "had", "can",
  "could", "would", "should", "tell", "me", "you", "your", "i", "please",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

let cachedChunks: KnowledgeChunk[] | null = null;
function getChunks(): KnowledgeChunk[] {
  if (!cachedChunks) cachedChunks = buildKnowledgeChunks();
  return cachedChunks;
}

export type ScoredChunk = KnowledgeChunk & { score: number };

/**
 * Score every chunk against the query using term overlap, with a boost
 * for matches in the chunk's title/tags (higher-signal fields) and a
 * mild boost for exact phrase containment.
 */
export function retrieve(query: string, topK = 6): ScoredChunk[] {
  const chunks = getChunks();
  const qTokens = tokenize(query);
  const qLower = query.toLowerCase();

  if (qTokens.length === 0) return [];

  const scored: ScoredChunk[] = chunks.map((chunk) => {
    const bodyTokens = tokenize(chunk.text);
    const titleTokens = tokenize(chunk.title);
    const tagTokens = chunk.tags.flatMap((t) => tokenize(t));

    let score = 0;
    for (const qt of qTokens) {
      if (bodyTokens.includes(qt)) score += 1;
      if (titleTokens.includes(qt)) score += 2;
      if (tagTokens.includes(qt)) score += 3;
    }
    if (qLower.length > 3 && chunk.text.toLowerCase().includes(qLower)) {
      score += 4;
    }

    return { ...chunk, score };
  });

  return scored
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/** Always-included baseline context so short/vague questions still land. */
export function retrieveWithFallback(query: string, topK = 6): ScoredChunk[] {
  const results = retrieve(query, topK);
  if (results.length > 0) return results;

  const chunks = getChunks();
  const fallbackIds = ["profile-summary", "projects-list", "skills"];
  return chunks
    .filter((c) => fallbackIds.includes(c.id))
    .map((c) => ({ ...c, score: 0 }));
}
