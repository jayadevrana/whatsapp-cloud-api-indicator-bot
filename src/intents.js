const GREETING_KEYWORDS = ["hi", "hello", "hey", "start", "namaste", "hola"];
const INDICATOR_KEYWORDS = [
  "indicator",
  "indicators",
  "link",
  "links",
  "tradingview",
  "ema",
  "stochastic",
  "breakout",
  "strategy",
  "oi",
  "xauusd",
  "nifty",
  "banknifty"
];
const DEVELOPER_KEYWORDS = [
  "developer",
  "pinescript",
  "pine script",
  "custom script",
  "hire",
  "freelance",
  "automation",
  "bot",
  "build for me",
  "need coder"
];

function hasKeyword(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

export function detectIntent(message) {
  const text = message.trim().toLowerCase();

  if (!text) {
    return "unknown";
  }

  if (hasKeyword(text, DEVELOPER_KEYWORDS)) {
    return "developer";
  }

  if (hasKeyword(text, INDICATOR_KEYWORDS)) {
    return "indicators";
  }

  if (hasKeyword(text, GREETING_KEYWORDS)) {
    return "greeting";
  }

  return "unknown";
}
