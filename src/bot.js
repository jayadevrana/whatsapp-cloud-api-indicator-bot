import { detectIntent } from "./intents.js";
import { findRelevantIndicators } from "./catalog.js";

function buildIndicatorText(indicators, config) {
  const lines = indicators.map((indicator, index) => {
    return `${index + 1}. *${indicator.title}*\n${indicator.description}\n${indicator.url}`;
  });

  return [
    `Here are some indicator links from ${config.businessName}:`,
    "",
    ...lines,
    "",
    "If you want a custom version, strategy logic, alerts, or automation, tap *Hire Pine dev* below."
  ].join("\n");
}

function buildDeveloperPitch(config) {
  return [
    `Need a Pine Script developer? I can build custom indicators, strategies, alerts, and trading tools for you.`,
    "",
    `WhatsApp: ${config.ownerWhatsappUrl}`,
    `Call: ${config.ownerCallUrl}`,
    "",
    "Send your idea, market, timeframe, and sample logic. I will reply personally."
  ].join("\n");
}

function buildWelcomeText(config) {
  return [
    `Welcome to *${config.assistantName}* by ${config.businessName}.`,
    `Ask for indicator links, TradingView tools, or Pine Script help for ${config.defaultCountryHint} or global markets.`,
    "",
    "Examples:",
    "- EMA trend indicator",
    "- BankNifty options tool",
    "- Gold M15 setup",
    "- Need a Pine Script developer"
  ].join("\n");
}

function buildHelpText(config) {
  return [
    "I can do two things right now:",
    "1. Share indicator links.",
    "2. Connect you for custom Pine Script development.",
    "",
    `Try: "send EMA indicator links" or "I need a Pine Script developer".`
  ].join("\n");
}

export function buildReplies(messageText, catalog, config) {
  const intent = detectIntent(messageText);

  if (intent === "greeting") {
    return [
      { type: "text", body: buildWelcomeText(config) },
      {
        type: "buttons",
        body: "What do you need?",
        buttons: [
          { id: "show_indicators", title: "Indicator links" },
          { id: "hire_developer", title: "Hire Pine dev" }
        ]
      }
    ];
  }

  if (intent === "indicators") {
    const indicators = findRelevantIndicators(messageText, catalog);
    return [
      { type: "text", body: buildIndicatorText(indicators, config), preview_url: true },
      {
        type: "buttons",
        body: "Want a custom indicator or strategy?",
        buttons: [
          { id: "hire_developer", title: "Hire Pine dev" },
          { id: "show_indicators", title: "More links" }
        ]
      }
    ];
  }

  if (intent === "developer") {
    return [
      { type: "text", body: buildDeveloperPitch(config), preview_url: true },
      {
        type: "buttons",
        body: "Do you also want some ready-made indicator links?",
        buttons: [
          { id: "show_indicators", title: "Send links" },
          { id: "start_over", title: "Main menu" }
        ]
      }
    ];
  }

  return [
    { type: "text", body: buildHelpText(config) },
    {
      type: "buttons",
      body: "Choose one option to continue.",
      buttons: [
        { id: "show_indicators", title: "Indicator links" },
        { id: "hire_developer", title: "Hire Pine dev" }
      ]
    }
  ];
}

export function resolveInteractiveMessage(message) {
  if (message.type === "interactive" && message.interactive?.button_reply?.id) {
    const buttonId = message.interactive.button_reply.id;
    if (buttonId === "show_indicators") {
      return "indicator links";
    }
    if (buttonId === "hire_developer") {
      return "need pine script developer";
    }
    if (buttonId === "start_over") {
      return "hello";
    }
  }

  if (message.type === "text") {
    return message.text?.body || "";
  }

  return "";
}
