const GRAPH_API_VERSION = "v23.0";

async function sendRequest(config, payload) {
  const response = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${config.phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`WhatsApp API error: ${response.status} ${errorText}`);
  }

  return response.json();
}

export async function sendTextMessage(config, to, body, previewUrl = false) {
  return sendRequest(config, {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "text",
    text: {
      preview_url: previewUrl,
      body
    }
  });
}

export async function sendReplyButtons(config, to, body, buttons) {
  return sendRequest(config, {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "interactive",
    interactive: {
      type: "button",
      body: { text: body },
      action: {
        buttons: buttons.map((button) => ({
          type: "reply",
          reply: {
            id: button.id,
            title: button.title
          }
        }))
      }
    }
  });
}
