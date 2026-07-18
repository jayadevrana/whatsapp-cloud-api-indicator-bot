import express from "express";
import { config } from "./config.js";
import { loadCatalog } from "./catalog.js";
import { buildReplies, resolveInteractiveMessage } from "./bot.js";
import { sendReplyButtons, sendTextMessage } from "./whatsapp.js";

const app = express();
const catalog = loadCatalog(config.catalogPath);

app.use(express.json());

app.get("/", (_request, response) => {
  response.json({
    ok: true,
    service: config.assistantName,
    catalogSize: catalog.length
  });
});

app.get("/webhook", (request, response) => {
  const mode = request.query["hub.mode"];
  const token = request.query["hub.verify_token"];
  const challenge = request.query["hub.challenge"];

  if (mode === "subscribe" && token === config.verifyToken) {
    return response.status(200).send(challenge);
  }

  return response.sendStatus(403);
});

app.post("/webhook", async (request, response) => {
  response.sendStatus(200);

  try {
    const entries = request.body.entry || [];

    for (const entry of entries) {
      for (const change of entry.changes || []) {
        if (change.field !== "messages") {
          continue;
        }

        const value = change.value || {};
        const messages = value.messages || [];

        for (const message of messages) {
          const incomingText = resolveInteractiveMessage(message);
          if (!incomingText) {
            continue;
          }

          const replies = buildReplies(incomingText, catalog, config);
          for (const reply of replies) {
            if (reply.type === "text") {
              await sendTextMessage(config, message.from, reply.body, reply.preview_url);
              continue;
            }

            if (reply.type === "buttons") {
              await sendReplyButtons(config, message.from, reply.body, reply.buttons);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Webhook processing failed:", error);
  }
});

app.listen(config.port, () => {
  console.log(`${config.assistantName} listening on port ${config.port}`);
});
