import fs from "node:fs";

let cachedCatalog = null;

export function loadCatalog(catalogPath) {
  if (cachedCatalog) {
    return cachedCatalog;
  }

  const raw = fs.readFileSync(catalogPath, "utf8");
  const catalog = JSON.parse(raw);

  cachedCatalog = catalog.map((item) => ({
    ...item,
    normalizedKeywords: (item.keywords || []).map((keyword) => keyword.toLowerCase())
  }));

  return cachedCatalog;
}

export function findRelevantIndicators(messageText, catalog) {
  const text = messageText.toLowerCase();
  const scored = catalog
    .map((item) => {
      const score = item.normalizedKeywords.reduce((total, keyword) => {
        return total + (text.includes(keyword) ? 1 : 0);
      }, 0);

      return { item, score };
    })
    .sort((left, right) => right.score - left.score || left.item.title.localeCompare(right.item.title));

  const matched = scored.filter((entry) => entry.score > 0).slice(0, 3).map((entry) => entry.item);
  return matched.length > 0 ? matched : catalog.slice(0, 3);
}
